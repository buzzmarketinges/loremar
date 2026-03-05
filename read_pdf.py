import sys
import PyPDF2

try:
    with open(sys.argv[1], 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open("pdf_out_utf8.txt", "w", encoding="utf-8", errors="ignore") as out_file:
            out_file.write(text)
except Exception as e:
    with open("pdf_out_utf8.txt", "w", encoding="utf-8") as out_file:
        out_file.write(f"Error: {e}")
