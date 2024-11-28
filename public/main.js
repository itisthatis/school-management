function usertype(){
    let userType = document.getElementById('userType');
    console.log(userType.value);
    studentField();
}

function studentField(){
    let userType = document.getElementById('userType');
    let studentField = document.getElementById('studentField')
    let teacherField = document.getElementById('teacherField')
    if(userType.value==="student"){
        studentField.style.display="block";
        teacherField.style.display="none";
    }
    else{
        teacherField.style.display="block";
        studentField.style.display="none"
    }

}