// Use ES6 module (type="module" in index.html)


class StudentApp {
constructor(options = {}){
this.output = document.getElementById(options.outputId || 'output');
this.search = document.getElementById(options.searchId || 'search');
this.sort = document.getElementById(options.sortId || 'sort');
this.dataUrl = options.dataUrl || 'data/students.json';
this.students = [];


// bind events
document.getElementById('loadThen').addEventListener('click', () => this.fetchWithThen());
document.getElementById('loadAsync').addEventListener('click', () => this.fetchWithAsync());
this.search.addEventListener('input', () => this.filterAndRender());
this.sort.addEventListener('change', () => this.filterAndRender());
}


// 1) Fetch using Promises with .then
fetchWithThen(){
fetch(this.dataUrl)
.then(response => {
if(!response.ok) throw new Error('Network response was not ok');
return response.json();
})
.then(data => {
this.students = data;
// Demonstrate another promise-based helper
this.getTopStudentsPromise(3)
.then(top => {
console.info('Top students (from promise):', top.map(s => s.name).join(', '));
});
this.filterAndRender();
})
.catch(err => this.showError(err));
}


// 2) Fetch using async/await
async fetchWithAsync(){
try{
const response = await fetch(this.dataUrl);
if(!response.ok) throw new Error('Failed to fetch ' + response.status);
this.students = await response.json();
// Use async helper
const top = await this.getTopStudentsAsync(2);
console.info('Top students (async):', top.map(s => s.name).join(', '));
this.filterAndRender();
} catch(err){
this.showError(err);
}
}


// Helper that returns a Promise (demonstrates creating a Promise)
getTopStudentsPromise(count = 3){
return new Promise((resolve) => {
const sorted = [...this.students].sort((a,b) => b.gpa - a.gpa).slice(0,count);
// small delay to simulate async op
setTimeout(() => resolve(sorted), 250);
});
}


// Async helper equivalent
async getTopStudentsAsync(count = 3){
const sorted = [...this.students].sort((a,b) => b.gpa - a.gpa).slice(0,count);
// return as resolved Promise implicitly
return sorted;
}


export default StudentApp;