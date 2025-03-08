let {Identity}=require('@semaphore-protocol/identity');
const fsPromises=require('fs/promises');
const crypto =require('crypto');

let commitments=[];
let privateKeys=[];
for(let i=0;i<20;i++){
    //let randNumber=Math.floor(Math.random()*9000+1000)
    let randNumber=crypto.randomBytes(32).toString('hex');
    
    //console.log(randNumber);
    if(privateKeys.includes(randNumber)){
        continue;
    }
    privateKeys.push(randNumber);
    // creating the identity
    const identity=new Identity(randNumber.toString());
    commitments.push(identity.commitment);
}
console.log(privateKeys);
console.log(commitments);

commitmentsString=commitments.join('\n');
privateKeysString=privateKeys.join('\n');

fsPromises.writeFile('generateInputs/companyCommitments.txt',commitmentsString)
    .then(()=> console.log('Commitments are successfuly written.'))
    .catch((err)=> console.error('Error!',err));

fsPromises.writeFile('public_client/companyCommitments.txt',commitmentsString)
    .then(()=> console.log('Commitments are successfuly written.'))
    .catch((err)=> console.error('Error!',err));

fsPromises.writeFile('generateInputs/companyPrivateKeys.txt',privateKeysString)
    .then(()=> console.log('Private keys is successfuly written.'))
    .catch((err)=> console.error('Error!',err));
