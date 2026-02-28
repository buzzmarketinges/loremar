import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import puppeteer from 'puppeteer-core';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const menu = await prisma.menu.findUnique({
            where: { id },
            include: {
                blocks: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!menu) {
            return NextResponse.json({ error: "Menú no encontrado" }, { status: 404 });
        }

        // Logic to generate HTML for the PDF
        const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Lato:wght@300;400&display=swap" rel="stylesheet">
    <style>
        @page { size: A4; margin: 0; }
        body { font-family: 'Lato', sans-serif; background-color: #ffffff; color: #2c3e50; margin: 0; padding: 0; height: 100vh; display: flex; justify-content: center; align-items: center; overflow: hidden; }
        .menu-card { width: 85%; max-width: 700px; padding: 40px 60px; text-align: center; position: relative; background: #fff; outline: 15px solid #fff; box-shadow: 0 0 0 2px #d4af37; box-sizing: border-box; }
        .header h1 { font-family: 'Playfair Display', serif; font-size: 42px; color: #b8860b; margin-bottom: 5px; letter-spacing: 2px; text-transform: uppercase; }
        .header p { font-style: italic; font-family: 'Playfair Display', serif; color: #7f8c8d; margin-bottom: 40px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 18px; text-transform: uppercase; letter-spacing: 3px; color: #2c3e50; margin-top: 25px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; }
        .section-title::before, .section-title::after { content: ""; flex: 1; height: 1px; background: #d4af37; margin: 0 15px; max-width: 40px; }
        .item-list { list-style: none; padding: 0; margin: 0; }
        .item-list li { font-size: 16px; margin: 6px 0; font-weight: 300; }
        .dish-item { margin-bottom: 12px; }
        .dish-name { font-weight: 400; font-size: 16px; }
        .dish-price { color: #b8860b; margin-left: 10px; font-family: 'Playfair Display', serif; }
        .dish-desc { font-size: 13px; color: #7f8c8d; font-style: italic; margin-top: 1px; }
        .paragraph { font-size: 15px; color: #34495e; line-height: 1.5; margin: 15px 0; }
        .footer { margin-top: 30px; font-size: 11px; color: #bdc3c7; border-top: 1px solid #eee; padding-top: 15px; }
        .gold-leaf { color: #d4af37; font-size: 24px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="menu-card">
        <div class="header">
            <h1>${menu.name}</h1>
            <p>${menu.type === 'MENU' && menu.price ? `${menu.price}€` : 'Experiencia Gastronómica'}</p>
        </div>
        <div class="gold-leaf">❦</div>
        ${menu.blocks.map((block: any) => {
            const content = JSON.parse(block.content);
            if (block.type === 'HEADER') {
                return `<div class="section-title">${content.text}</div>`;
            } else if (block.type === 'PARAGRAPH') {
                return `<p class="paragraph">${content.text}</p>`;
            } else if (block.type === 'DISH') {
                return `
                <div class="dish-item">
                    <div class="dish-name">${content.name} ${content.price ? `<span class="dish-price">${content.price}€</span>` : ''}</div>
                    ${content.description ? `<div class="dish-desc">${content.description}</div>` : ''}
                </div>`;
            }
            return '';
        }).join('')}
        <div class="footer">
            <p>LOREMAR &nbsp; | &nbsp; ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>`;

        // Environment detection for browser launch
        const isVercel = process.env.VERCEL === "1";
        let browserProps: any = {};

        if (isVercel) {
            console.log("Launching Chromium on Vercel...");
            const chromium = require('@sparticuz/chromium').default;
            browserProps = {
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
            };
        } else {
            console.log("Launching local Chrome on Windows...");
            browserProps = {
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
            };
        }

        const browser = await puppeteer.launch(browserProps);

        console.log("Setting page content...");
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        console.log("Generating PDF...");
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });

        await browser.close();

        return new Response(pdfBuffer as any, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${menu.name.replace(/\s+/g, '_')}.pdf"`
            }
        });
    } catch (error) {
        console.error("PDF generation error:", error);
        return NextResponse.json({ error: "Error al generar el PDF" }, { status: 500 });
    }
}
