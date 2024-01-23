function tambahData() {
    var namaBarangInput = document.getElementById("namaBarang");
    var beratInput = document.getElementById("berat");
    var gambarInput = document.getElementById("gambar");
    var barangBody = document.getElementById("barangBody");

    var namaBarang = namaBarangInput.value;
    var berat = parseFloat(beratInput.value);
    var gambar = gambarInput.value;

    if (berat > 5) {
        var backgroundColorClass = "highlight";
    } 

    var newRow = barangBody.insertRow();
    var cellNo = newRow.insertCell(0);
    var cellNamaBarang = newRow.insertCell(1);
    var cellBerat = newRow.insertCell(2);
    var cellGambar = newRow.insertCell(3);
    var cellAksi = newRow.insertCell(4);

    cellNo.textContent = barangBody.rows.length;
    cellNamaBarang.textContent = namaBarang;
    cellBerat.textContent = berat + " kg";
    cellBerat.classList.add(backgroundColorClass);
    cellGambar.innerHTML = '<img src="' + gambar + '" alt="' + namaBarang + '" style="max-width: 100px;">';

    var btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.onclick = function() {
        editBaris(newRow);
    };
    cellAksi.appendChild(btnEdit);

    var btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.onclick = function() {
        hapusBaris(newRow);
    };
    cellAksi.appendChild(btnHapus);

    namaBarangInput.value = "";
    beratInput.value = "";
    gambarInput.value = "";
}

function editBaris(row) {
    var cells = row.cells;

    // Simpan nilai awal sebelum diubah
    var originalValues = {
        namaBarang: cells[1].textContent,
        berat: cells[2].textContent,
        gambar: cells[3].getElementsByTagName('img')[0].src,
    };

    // Ubah sel menjadi input untuk diedit
    cells[1].innerHTML = '<input type="text" id="editNamaBarang" value="' + originalValues.namaBarang + '">';
    cells[2].innerHTML = '<input type="number" id="editBerat" value="' + parseFloat(originalValues.berat) + '">';
    cells[3].innerHTML = '<input type="text" id="editGambar" value="' + originalValues.gambar + '">';

    // Ganti tombol Edit menjadi Save
    cells[4].innerHTML = '<button onclick="saveBaris(this.parentNode.parentNode)">Save</button>';

    // Hapus tombol hapus
    cells[4].removeChild(cells[4].getElementsByTagName('button')[1]);
}

function saveBaris(row) {
    var cells = row.cells;

    // Ambil nilai yang diedit
    var editedValues = {
        namaBarang: document.getElementById("editNamaBarang").value,
        berat: parseFloat(document.getElementById("editBerat").value),
        gambar: document.getElementById("editGambar").value,
    };

    // Kembalikan sel menjadi text
    cells[1].textContent = editedValues.namaBarang;
    cells[2].textContent = editedValues.berat + " kg";
    cells[3].innerHTML = '<img src="' + editedValues.gambar + '" alt="' + editedValues.namaBarang + '" style="max-width: 100px;">';

    // Ganti tombol Save menjadi Edit
    cells[4].innerHTML = '<button onclick="editBaris(this.parentNode.parentNode)">Edit</button>';

    // Tambahkan tombol hapus
    var btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.onclick = function() {
        hapusBaris(row);
    };
    cells[4].appendChild(btnHapus);
}

function hapusBaris(row) {
    var barangBody = document.getElementById("barangBody");
    barangBody.removeChild(row);

    for (var i = 0; i < barangBody.rows.length; i++) {
        barangBody.rows[i].cells[0].textContent = i + 1;
    }
}