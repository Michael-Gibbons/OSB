import { readFile, writeFile } from 'fs';

// source = file url
// destination = file url
// delimiters = object or array of objects with the following form
// {
//   from: "__SOME__DELIMITER__"
//   to: "SomeSuperCoolThing"
// }

const copyFileFromTemplate = (source, destination, delimiters) => {
  readFile(source, 'utf-8', function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }

    if(!Array.isArray(delimiters)){
      delimiters = [delimiters]
    }

    if(typeof source !== 'string' || typeof destination !== 'string'){
      throw new Error("Invalid input. Source and destination must be strings.")
    }

    const allInputsAreCorrect = delimiters.every(delimiter => Object.hasOwn(delimiter, 'from') && Object.hasOwn(delimiter, 'to'))
    if(!allInputsAreCorrect){
      throw new Error("Invalid input. All objects must have a \"from\" and \"to\" property")
    } 

    let output = contents
    for (const delimiter of delimiters) {
      output = output.replaceAll(delimiter.from, delimiter.to);
    }

    writeFile(destination, output, 'utf-8', function (err) {
      if(err){
        console.log(err);
      }
    });
  });
}

export default copyFileFromTemplate