const express=require('express');
const fsPromises=require('fs/promises');
const path=require('path');
let {verifyProof}=require('@semaphore-protocol/proof');

const router=express.Router();

async function recordReview(message){
    await fsPromises.appendFile('./postedReviews',message,{encoding:'utf-8'});
}


const commitmentsFilePath='public_client/companyCommitments.txt';
// locally saved list of nullifiers required from verified proofs
const nullifiersPath='./validNullifiers.txt';

async function readFile(path){
    let data=await fsPromises.readFile(path,{encoding:'utf-8'});
    return data;
}

async function writeFile(path,data){
    let word=data+'\n';
    await fsPromises.appendFile(path,word,{encoding:'utf-8'});
}

async function main(userProof){
    let canLeaveReview=false;
    let alreadyLeftReview=false;

    // we only need to validate the proof
    // and check if the same user has already left a review

    if(userProof!='-1'){
        let userNullifier=userProof.nullifier;
    
        let nullifiers=await readFile(nullifiersPath);
        nullifiers=nullifiers.split('\n');

        if(nullifiers.includes(userNullifier)){
            console.log('User already left a revies! SPAM IS FORBBIDEN!');
            alreadyLeftReview=true;
        }else{
            // verifying th proof
            let ret=await verifyProof(userProof);
            console.log(ret);

            if(ret){
                canLeaveReview=true;
                // proof is valid
                console.log('Writing to a file...');

                await writeFile(nullifiersPath,userNullifier)
                    .then(()=> console.log('Nullifier is recorded'))
                    .catch((err)=>console.error(err));

                console.log('Writing is finished.');
            } else {
                // proof is not valid
                console.log('Proof is not valid!')
            }
            
        }
    }
    
    let retObj={ 
        canLeaveReview:canLeaveReview,
        alreadyLeftReview:alreadyLeftReview
    };

    return retObj;
}

let commentNumber=2;

router.post('/review', function (req,res,next){
    const data=req.body;
    
    let userProof=data.userProof;
    const message=data.message;

    if(userProof!=="-1"){
        userProof=JSON.parse(userProof);
    }

    let isValid;
    let alreadyLeftReview;

    main(userProof)
        .then((retObj) => {
            isValid=retObj.canLeaveReview;
            alreadyLeftReview=retObj.alreadyLeftReview;

            if(isValid){
                // record this review in a file containing all previous valid reviews
                recordReview(message+"\n");
                commentNumber+=1;
        
            }

            fsPromises.readFile('./postedReviews',{encoding:'utf-8'})
                    .then( function (data){
                        let messages=data.split('\n');
                        messages.pop();
                        console.log(messages);

                        res.render('response.ejs',{
                            isValid:isValid,
                            alreadyLeftReview:alreadyLeftReview,
                            commentNumber:commentNumber,
                            messages:messages
                        });
                        })
                    .catch((err)=> console.error('Error while reading postedReviews.'));
            
        })
        .catch((err) => console.error('Error while executing main'));
});

module.exports=router;