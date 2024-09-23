// Fungsi untuk membaca file TXT dan menampilkan hasilnya di textarea
function convertTxtToVcf() {
    const fileInput = document.getElementById('txtFile');
    const vcfOutput = document.getElementById('vcfOutput');

    if (fileInput.files.length === 0) {
        alert('Tidak ada file yang diunggah. Anda bisa menambah nomor secara manual di kolom hasil konversi.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        vcfOutput.value = text; // Tampilkan isi TXT ke kolom hasil konversi
    };

    reader.readAsText(file);
}

// Fungsi untuk mengunduh file VCF berdasarkan hasil konversi yang ada di kolom output
function downloadVCF() {
    const vcfOutput = document.getElementById('vcfOutput').value;
    const vcfFileNameInput = document.getElementById('vcfFileName').value;

    const fileInput = document.getElementById('txtFile');
    const txtFileName = fileInput.files.length > 0 ? fileInput.files[0].name.replace('.txt', '') : 'contacts'; // Nama file TXT tanpa ekstensi

    const vcfFileName = vcfFileNameInput || txtFileName; // Jika nama file kosong, gunakan nama file TXT

    const adminName = document.getElementById('adminName').value || 'Admin';
    const navyName = document.getElementById('navyName').value || 'Navy';
    const anggotaName = document.getElementById('anggotaName').value || 'Anggota';

    const splitOption = document.querySelector('input[name="splitOption"]:checked').value;

    if (vcfOutput.trim() === '') {
        alert('Tidak ada konten VCF untuk diunduh!');
        return;
    }

    const lines = vcfOutput.split(/\r?\n/);
    let vcfContentAdminNavy = '';
    let vcfContentAnggota = '';
    let vcfContentAll = '';
    let currentSection = '';

    let adminCounter = 1;
    let navyCounter = 1;
    let anggotaCounter = 1;

    // Looping untuk membaca isi konversi dan memberikan nama kontak sesuai label (admin/navy/anggota)
    lines.forEach((line) => {
        const number = line.trim();
        if (number.toLowerCase() === 'admin') {
            currentSection = 'admin';
        } else if (number.toLowerCase() === 'navy') {
            currentSection = 'navy';
        } else if (number.toLowerCase() === 'anggota') {
            currentSection = 'anggota';
        } else if (number !== '') {
            let contactName = '';
            if (currentSection === 'admin') {
                contactName = `${adminName} ${adminCounter}`;
                adminCounter++;
                vcfContentAdminNavy += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${number}\nEND:VCARD\n\n`;
            } else if (currentSection === 'navy') {
                contactName = `${navyName} ${navyCounter}`;
                navyCounter++;
                vcfContentAdminNavy += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${number}\nEND:VCARD\n\n`;
            } else if (currentSection === 'anggota') {
                contactName = `${anggotaName} ${anggotaCounter}`;
                anggotaCounter++;
                vcfContentAnggota += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${number}\nEND:VCARD\n\n`;
            }
            // Gabungkan semuanya untuk opsi "Tidak dipisahkan"
            vcfContentAll += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${number}\nEND:VCARD\n\n`;
        }
    });

    if (splitOption === 'yes') {
        // Jika opsi "Ya, pisahkan jadi 2 file VCF"
        if (vcfContentAdminNavy) {
            const blobAdminNavy = new Blob([vcfContentAdminNavy], { type: 'text/vcard' });
            const linkAdminNavy = document.createElement('a');
            linkAdminNavy.href = URL.createObjectURL(blobAdminNavy);
            linkAdminNavy.download = `${vcfFileName}_Admin_Navy.vcf`;
            linkAdminNavy.click();
        }

        if (vcfContentAnggota) {
            const blobAnggota = new Blob([vcfContentAnggota], { type: 'text/vcard' });
            const linkAnggota = document.createElement('a');
            linkAnggota.href = URL.createObjectURL(blobAnggota);
            linkAnggota.download = `${vcfFileName}_Anggota.vcf`;
            linkAnggota.click();
        }
    } else {
        // Jika opsi "Tidak, gabungkan semuanya jadi 1 file VCF"
        const blobAll = new Blob([vcfContentAll], { type: 'text/vcard' });
        const linkAll = document.createElement('a');
        linkAll.href = URL.createObjectURL(blobAll);
        linkAll.download = `${vcfFileName}.vcf`;
        linkAll.click();
    }
}