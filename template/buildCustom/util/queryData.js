module.exports = (data, cont, index, isStart) => {
  let staIndex;
  let endIndex;
  if (isStart) {
    staIndex = data.indexOf("{", index);
    endIndex = data.indexOf("}", index);
  } else {
    staIndex = data.lastIndexOf("{", index);
    endIndex = data.lastIndexOf("}", index);
  }
  //若填入部分内容为空
  if (!data.substring(staIndex + 1, endIndex).replace(/\s+/g, "")) {
    cont = cont.slice(1)
  }
  if (isStart) {
    return data.substring(0, staIndex + 1) + cont + data.substring(staIndex + 1);
  } else {
    console.log(data)
    return data.substring(0, endIndex) + cont + ' ' + data.substring(endIndex);
  }
}