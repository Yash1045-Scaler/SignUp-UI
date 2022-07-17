const errColor = "#e22d4c",
    borderColor = "#d6dee5",
    labelColor = "#61738E",
    inputColor = "#0080ff",
    white="#fff",
    profileBoxColor = "#F2F8FF";


const dataFields = document.querySelectorAll("[input-val]"),
profileProfessional = document.querySelector("[input-prof='professional']"),
profileStudent = document.querySelector("[input-prof='student']"),
profileAvatar = document.getElementById("avatar"),
submitBtn = document.querySelector("[input-btn='submit']");


let valid = true,profileSelection=false;



// to validate individual field 
const checker = (field) =>{
    const inp = field.querySelector("input"),
    lbl = field.querySelector("label"),
    fName = field.getAttribute("input-val");
    if(!inp?.value?.match(validator[fName])){

        // console.log(fName);
        if(document.querySelector(`[input-err='${fName}']`)){
            valid = false;
            
            document.querySelector(`[input-err='${fName}']`).style.display ="inline";
            inp.style.borderColor = errColor;
            lbl.style.color = errColor;
        }
    }
    else{
        if(document.querySelector(`[input-err='${fName}']`)){
            document.querySelector(`[input-err='${fName}']`).style.display ="none";
            inp.style.borderColor = borderColor;
            lbl.style.color = labelColor;
        }
    }
};


// when a input field is left by the mouse
const unFocus = (field) => {
    const inp = field.querySelector("input");
    if (inp.value?.length) checker(field);
    else {
        const fName = field.getAttribute("input-val");

        if(field.getAttribute("input-val")=== "username"){
            const inp = field.querySelector("input"),
            lbl = field.querySelector("label");
            document.querySelector(`[input-err='${fName}']`).style.display ="inline";
            inp.style.borderColor = errColor;
            lbl.style.color = errColor;
        }
        else{
            const inp = field.querySelector("input"),
            lbl = field.querySelector("label");
        document.querySelector(`[input-err='${fName}']`).style.display = "none";
            inp.style.borderColor=borderColor;
            lbl.style.color=labelColor;
        }
    }
};

const setProfile = (selected, unselected) => {
    profileSelection = true;
    document.querySelector("[input-err='profile']").style.display = "none";
    selected.style.borderColor = inputColor;
    selected.style.backgroundColor = profileBoxColor;
    unselected.style.backgroundColor = white;
    unselected.style.borderColor = borderColor;
};

const activateProfile = (field) => {
    if (field.getAttribute("input-prof") === "student") {
        setProfile(field, profileProfessional);
        profileAvatar.style.backgroundImage ="url('https://assets.interviewbit.com/assets/ibpp/moco_event/student/moco-f1-student-abcd199fbac6dcee9564dd3c34e39000bf0687bcc6f06ab764a38aea31e118f9.png')";
    } else if (
        field.getAttribute("input-prof") === "professional"
    ) {
        setProfile(field, profileStudent);
        profileAvatar.style.backgroundImage ="url('https://assets.interviewbit.com/assets/ibpp/moco_event/professional/moco-f1-professional-0ca5ded8f6ba9db16c5d052ae08d761fe60e956985123a35373489f7656c5a0e.png')";
    }
};
for(const field of dataFields){
    // console.log(field.getAttribute("input-val"));
    field.querySelector("input")?.addEventListener("focusout", (event) => unFocus(field) );
}
profileProfessional.addEventListener("click", ()=> activateProfile(profileProfessional));
profileStudent.addEventListener("click", () => activateProfile(profileStudent)
);

// doing a reset after sucessfull submit
const reset = () =>{
    profileSelection=false;
    for(const field of dataFields){
        const inp = field.querySelector("input");
        const lbl = field.querySelector("label");
        if(inp){
            inp.value="";
            inp.style.borderColor=borderColor;
            lbl.style.color=labelColor;
        }
        else{
            field.style.borderColor=borderColor;
        }
    }
    profileStudent.style.backgroundColor = white;
    profileStudent.style.borderColor = borderColor;
    profileProfessional.style.backgroundColor = white;
    profileProfessional.style.borderColor = borderColor;
    profileAvatar.style.backgroundImage ="url('https://assets.interviewbit.com/assets/ibpp/moco_event/professional/moco-f1-common-08f74b39620f4465001c38619a77bb0540f6abfc466cf283d8f056546c14537b.png')";
    document.querySelector("[data-class='country-code']").querySelector("input").value = "+91";
}


submitBtn.addEventListener("click", (event) => {
    valid=true;
    event.preventDefault();
    for(const field of dataFields){
        checker(field);

    }
    if(!profileSelection){
        document.querySelector("[input-err='profile']").style.display="inline";
    }
    if(valid && profileSelection){
        reset();
    }
} );

// Country Codes
let country = Object.values(phoneCodes);
let searchField = document.querySelector("[data-class='country-code']"),
dropdown = document.querySelector('[data-codes="country"]');

const search = (event) => {
    const filteredCodes = country.filter((code) => 
    code.includes(event.target.value) );
    dropdown.innerHTML = filteredCodes.map((code) => 
    `<span>${code}</span>`).join("");

    let codes = dropdown.querySelectorAll("span");
    for(let i = 0; i<codes.length; i++){
        codes[i].addEventListener("click", setCountryCode );
    }
    dropdown.style.display="flex";
    if(filteredCodes.length === 0 || event.target.value.match(/[a-z]/i))
    {
    dropdown.style.display="none";
    }
};
searchField.addEventListener("keyup", search);
searchField.addEventListener("focusout",(event) => {
    if(!country.includes(event.target.value)){
        searchField.querySelector("input").value = "+91";
        dropdown.style.display="none";

    }
    else{
        dropdown.style.display="none";
    }
})

const setCountryCode = (event) => {
    searchField.querySelector("input").value  = event.target.innerHTML;
    dropdown.style.display="none";
}