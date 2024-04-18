// 查詢所有學生
async function getAllStudents() {
  const response = await fetch('/students');
  const data = await response.json();
  return data;
}

async function listAllStudents() {
  const studentsData = await getAllStudents();
  const studentsList = document.getElementById('students-list');
  studentsList.innerHTML = '';
  for (let key in studentsData) {
    const row = document.createElement('div');
    row.textContent = `學號: ${key}, 姓名: ${studentsData[key]}`;
    studentsList.appendChild(row);
  }
}

document.getElementById('list-students-button').addEventListener('click', listAllStudents);

// 查詢特定學生
async function getStudentName(studentId) {
  try {
    const response = await fetch(`/students/${studentId}`);
    if (!response.ok) throw new Error(`Error fetching student with ID ${studentId}: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('此學號沒有對應學生！');
    return null;
  }
}

document.getElementById('search-student-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const studentId = document.getElementById('search-input-id').value;
  const studentName = await getStudentName(studentId);

  if (!studentName) {
    document.getElementById('show-student-name').textContent = '此學號沒有對應學生！';
  } else {
    document.getElementById('show-student-name').textContent = `Hello, ${studentName}`;
  }
});

// 新增學生
async function addStudent(studentId, studentName) {
  const request = await fetch('/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, studentName }),
  });

  if (!request.ok) throw new Error(`Error adding student with ID ${studentId}`);
}

document.getElementById('add-student-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const studentId = document.getElementById('add-input-id').value;
  const studentName = document.getElementById('add-input-name').value;
  await addStudent(studentId, studentName);
  alert(`新增學生成功！學號: ${studentId}, 姓名: ${studentName}`);
});

// 刪除學生
async function deleteStudent(studentId) {
  const request = await fetch(`/students/${studentId}`, {
    method: 'DELETE',
  });

  if (!request.ok) throw new Error(`Error deleting student with ID ${studentId}`);
}

document.getElementById('delete-student-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const studentId = document.getElementById('delete-input-id').value;
  await deleteStudent(studentId);
  alert(`刪除學生成功！學號: ${studentId}`);
});