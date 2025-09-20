
const promiseBtn = document.getElementById('promise-btn');
const asyncBtn = document.getElementById('async-btn');


const fetchWithAsyncAwait = async () => {

};


const fetchWithPromises = () => {
    studentContainer.innerHTML = '<h2>Loading with Promises...</h2>';
    fetch('data/students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(studentsData => {
            allStudentsData = studentsData;
            renderStudents(allStudentsData);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            studentContainer.innerHTML = `<h2 style="color: red;">Failed to load data.</h2>`;
        });
};

promiseBtn.addEventListener('click', fetchWithPromises);
asyncBtn.addEventListener('click', fetchWithAsyncAwait);