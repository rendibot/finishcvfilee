# TXT to VCF Converter

This is a simple web application that allows you to convert phone numbers in a `.txt` file to a `.vcf` (vCard) format, commonly used for contact information. It supports categorizing contacts under different sections like Admin, Navy, and Anggota.

## Features

- Upload a `.txt` file with phone numbers.
- The contacts will be categorized under **Admin**, **Navy**, and **Anggota**.
- Option to provide custom names for each category.
- Option to separate contacts between Admin + Navy and Anggota into two `.vcf` files, or combine them into a single file.
- You can download the converted phone numbers as a `.vcf` file.
- If no custom file name is provided, the `.vcf` file will use the name of the uploaded `.txt` file.

## Usage

1. Clone or download this repository.
2. Open the `index.html` file in your browser.
3. Fill in the form fields:
   - **Admin, Navy, Anggota**: Enter custom names for each category of contacts.
   - **File Name**: Optionally, provide a name for the VCF file.
   - **Separate or Combine**: Choose whether to generate one file for Admin + Navy and another for Anggota, or combine them all into a single file.
4. Upload a `.txt` file containing phone numbers.
5. After uploading, the phone numbers will appear in the textarea under the relevant category.