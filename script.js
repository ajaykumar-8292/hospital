

    const user = document.getElementById("authUser").value;
    const pass = document.getElementById("authPass").value;

    if(!user || !pass){
        alert("Enter Username and Password");
        return;
    }

    const savedAccount = JSON.parse(localStorage.getItem(AUTH_KEY));

    if(isLoginMode){

        if(savedAccount && savedAccount.user === user && savedAccount.pass === pass){

            document.getElementById("authPage").style.display="none";
            document.getElementById("mainSystem").style.display="block";

        }else{
            alert("Wrong Username or Password");
        }

    }else{

        localStorage.setItem(AUTH_KEY, JSON.stringify({user, pass}));
        alert("Admin Registered Successfully. Now Login.");
        switchMode();
    }

}

function logoutAdmin(){

    document.getElementById("mainSystem").style.display="none";
    document.getElementById("authPage").style.display="flex";

}
const LS = 'cms_students_v2';
        const $ = id => document.getElementById(id);

        let students = JSON.parse(localStorage.getItem(LS) || "[]");

        function uid() {
            return Date.now().toString(36);
        }

        function saveData() {
            localStorage.setItem(LS, JSON.stringify(students));
            renderTable();
        }

        function previewImage(input, previewEl) {
            input.addEventListener('change', () => {
                const file = input.files[0];
                if (file) previewEl.src = URL.createObjectURL(file);
            });
        }

        previewImage($('photo'), $('photoPreview'));
        previewImage($('sign'), $('signPreview'));

        // RENDER TABLE
        function renderTable(filter = '') {
            const tbody = document.querySelector('#studentsTable tbody');
            tbody.innerHTML = '';

            students
                .filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
                .forEach((s, i) => {
                    tbody.innerHTML += `
        <tr>
          <td>${i+1}</td>
          <td><img class="thumb" src="${s.photo || ''}"></td>
          <td>${s.name}</td>
          <td>${s.age}</td>
          <td>${s.degree}</td>
          <td>${s.email}</td>
          <td><img class="thumb" src="${s.sign || ''}"></td>
          <td>
            <button onclick="editStudent('${s.id}')">Edit</button>
            <button onclick="deleteStudent('${s.id}')">Delete</button>
          </td>
        </tr>`;
                });
        }

        // ADD/UPDATE
        $('studentForm').addEventListener('submit', e => {
            e.preventDefault();

            const id = $('studentId').value;
            const data = {
                name: $('name').value,
                age: $('age').value,
                degree: $('degree').value,
                email: $('email').value,
                photo: $('photoPreview').src,
                sign: $('signPreview').src
            };

            if (id) {
                students = students.map(s => s.id === id ? {...s, ...data} : s);
            } else {
                students.push({...data, id: uid() });
            }

            $('studentForm').reset();
            $('photoPreview').src = '';
            $('signPreview').src = '';
            $('formTitle').textContent = "Add Student";
            saveData();
        });

        function editStudent(id) {
            const st = students.find(s => s.id === id);
            if (!st) return;

            $('studentId').value = st.id;
            $('name').value = st.name;
            $('age').value = st.age;
            $('degree').value = st.degree;
            $('email').value = st.email;
            $('photoPreview').src = st.photo;
            $('signPreview').src = st.sign;
            $('formTitle').textContent = "Edit Student";
        }

        function deleteStudent(id) {
            if (!confirm("Delete this student?")) return;
            students = students.filter(s => s.id !== id);
            saveData();
        }

        $('searchInput').addEventListener('input', e => renderTable(e.target.value));
        $('clearAllBtn').addEventListener('click', () => {
            if (confirm("Clear ALL?")) {
                students = [];
                saveData();
            }
        });

        renderTable();