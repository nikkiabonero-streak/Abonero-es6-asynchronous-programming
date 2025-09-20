


class StudentApp {
constructor(options = {}){
this.output = document.getElementById(options.outputId || 'output');
this.search = document.getElementById(options.searchId || 'search');
this.sort = document.getElementById(options.sortId || 'sort');
this.dataUrl = options.dataUrl || 'data/students.json';
this.students = [];



document.getElementById('loadThen').addEventListener('click', () => this.fetchWithThen());
document.getElementById('loadAsync').addEventListener('click', () => this.fetchWithAsync());
this.search.addEventListener('input', () => this.filterAndRender());
this.sort.addEventListener('change', () => this.filterAndRender());
}


n
fetchWithThen(){
fetch(this.dataUrl)
.then(response => {
if(!response.ok) throw new Error('Network response was not ok');
return response.json();
})
.then(data => {
this.students = data;

this.getTopStudentsPromise(3)
.then(top => {
console.info('Top students (from promise):', top.map(s => s.name).join(', '));
});
this.filterAndRender();
})
.catch(err => this.showError(err));
}



async fetchWithAsync(){
try{
const response = await fetch(this.dataUrl);
if(!response.ok) throw new Error('Failed to fetch ' + response.status);
this.students = await response.json();

const top = await this.getTopStudentsAsync(2);
console.info('Top students (async):', top.map(s => s.name).join(', '));
this.filterAndRender();
} catch(err){
this.showError(err);
}
}


getTopStudentsPromise(count = 3){
return new Promise((resolve) => {
const sorted = [...this.students].sort((a,b) => b.gpa - a.gpa).slice(0,count);

setTimeout(() => resolve(sorted), 250);
});
}



async getTopStudentsAsync(count = 3){
const sorted = [...this.students].sort((a,b) => b.gpa - a.gpa).slice(0,count);

return sorted;
}


export default StudentApp;
