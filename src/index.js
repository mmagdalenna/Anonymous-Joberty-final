import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group";
import { generateProof } from "@semaphore-protocol/proof"


let userComment=document.querySelector('.userComment');
let calculateProofButton=document.getElementById('calculateProof');
let privateKeyInput=document.getElementById('privateKey');
let userProofInput=document.getElementById('userProof');
let publishButton=document.getElementById('publish');
let reviewInput=document.getElementById('message');

userComment.addEventListener('input',e => {
    if(!privateKeyInput.value){ 
        calculateProofButton.setAttribute('disabled','disabled');
        calculateProofButton.classList.remove('abled');
    } else {
        calculateProofButton.removeAttribute('disabled');
        calculateProofButton.classList.add('abled');
    }
});


calculateProofButton.addEventListener('click',writeProof);

async function getCommitments(){ 
    let data=await fetch('/companyCommitments.txt'); 
    let commitmentText= await data.text();
    let commitments=commitmentText.split('\n').map((elem)=>BigInt(elem));
    //console.log(commitments);
    return commitments;
}

async function calculateProof(){
    let commitments=await getCommitments();
    
    // creating a Group
    const group=new Group(commitments);

    // generating user Identity 
    let userPrivateKey=privateKeyInput.value;
    let userIdentity=new Identity(userPrivateKey.toString());
    let userCommentment=userIdentity.commitment;
    
    if(group.indexOf(userCommentment)!=-1){
        console.log('User is a member of the group and can potentially leave a review!');
    
        const scope=group.root;
        const message=reviewInput.value;
        // generating the proof
        const proof=await generateProof(userIdentity,group,message,scope);
        console.log('PROOF:',proof);
        console.log('-----------------');
        
        let jsonProof=JSON.stringify(proof);
        //console.log(jsonProof);
        userProofInput.value=jsonProof;

    } else {
        console.log('User CANNOT leave a review.');
        
        userProofInput.value='-1';
    }

}

let proofMessage=document.getElementById('proofMessage');

function writeProof(){
    calculateProof()
        .then(() => {
            console.log('Proof is calculated');
            proofMessage.innerText='Proof is calculated';
            
            publishButton.removeAttribute('disabled');
            publishButton.classList.add('abled');
        })
        .catch((err) => console.error('ERROR HAS OCCURED',err));
}
