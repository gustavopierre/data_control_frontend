/*
  --------------------------------------------------------------------------------------
  Function to obtain the existing list from the server by GET request
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/dataset';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.dataset.forEach(item => insertList(item.name, item.area, 
        item.permitted, item.coordinate_system, item.check_date, 
        item.format, item.source))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
}

/*
  --------------------------------------------------------------------------------------
  Initial call of function to get the list from the server
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Function to insert a new data in the server list by POST request
  --------------------------------------------------------------------------------------
*/
const postData = async (inputName, inputArea, inputDescription, inputSource, 
  inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
  inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
  inputCheckDate, inputFormat) => {
  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('area', inputArea);
  formData.append('description', inputDescription);
  formData.append('source', inputSource);
  formData.append('creator', inputCreator);
  formData.append('permitted', inputPermitted);
  formData.append('copyright', inputCopyright);
  formData.append('link', inputLink);
  formData.append('info', inputInfo);
  formData.append('coordinate_system', inputCoordinateSystem);
  formData.append('creation_date', inputCreationDate);
  formData.append('update_date', inputUpdateDate);
  formData.append('check_date', inputCheckDate);
  formData.append('format', inputFormat);

  let url = 'http://127.0.0.1:5000/data';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        insertList(inputName, inputArea, inputPermitted, inputCoordinateSystem, inputCheckDate, inputFormat)
          alert("Data added!")
      }
      else if (response.status == 409) {
        alert("Existing a Data with same name!")
      }
      else {
        alert("Error adding data!")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
} 


/*
  --------------------------------------------------------------------------------------
  Function to create a check button with green icon
  for each item in the list 
  --------------------------------------------------------------------------------------
*/
const insertButtonCheckGreen = (parent) => {
  // Criar o elemento button
  let button = document.createElement("button");
  button.className = "icon-button-check";
  button.onclick = checkData;

  // Criar o elemento img
  let img = document.createElement("img");
  img.src = "img/check_green.png";
  img.alt = "Button with a green check icon";
  img.title = "Check"; // Usando title como hint

  // Anexar img ao button
  button.appendChild(img);

  // Anexar button ao elemento pai
  parent.appendChild(button);
};

/*
  --------------------------------------------------------------------------------------
  Function to create a check button with red icon
  for each item in the list 
  --------------------------------------------------------------------------------------
*/
const insertButtonCheckRed = (parent) => {
  // Criar o elemento button
  let button = document.createElement("button");
  button.className = "icon-button-check";
  button.onclick = checkData;

  // Criar o elemento img
  let img = document.createElement("img");
  img.src = "img/check_red.png";
  img.alt = "Button with a red check icon";
  img.title = "Check"; // Usando title como hint

  // Anexar img ao button
  button.appendChild(img);

  // Anexar button ao elemento pai
  parent.appendChild(button);
};

/*
  --------------------------------------------------------------------------------------
  Function to create a delete button with trash bin icon
  for each item in the list 
  --------------------------------------------------------------------------------------
*/
const insertButtonDelete = (parent) => {
  // Criar o elemento button
  let button = document.createElement("button");
  button.className = "icon-button-delete";

  // Criar o elemento img
  let img = document.createElement("img");
  img.src = "img/close.png";
  img.alt = "Button with a trash bin icon";
  img.title = "Delete"; // Usando title como hint

  // Anexar img ao button
  button.appendChild(img);

  // Anexar button ao elemento pai
  parent.appendChild(button);
};


/*
  --------------------------------------------------------------------------------------
  Function to create a edit button with pen icon
  for each item in the list 
  --------------------------------------------------------------------------------------
*/
const insertButtonEdit = (parent) => {
  // Criar o elemento button
  let button = document.createElement("button");
  button.className = "icon-button-edit";
  button.onclick = showEdit;
  // Criar o elemento img
  let img = document.createElement("img");
  img.src = "img/pen.png";
  img.alt = "Button with pen icon";
  img.title = "Data Edition"; // Usando title como hint

  // Anexar img ao button
  button.appendChild(img);

  // Anexar button ao elemento pai
  parent.appendChild(button);
};

/*
  --------------------------------------------------------------------------------------
  Function to create a info button with letter i icon
  for each item in the list 
  --------------------------------------------------------------------------------------
*/
const insertButtonInfo = (parent) => {
  // Criar o elemento button
  let button = document.createElement("button");
  button.className = "icon-button-info";
  button.onclick = showInfo;

  // Criar o elemento img
  let img = document.createElement("img");
  img.src = "img/information.png";
  img.alt = "Button with letter i icon";
  img.title = "Data Information"; // Usando title como hint

  // Anexar img ao button
  button.appendChild(img);

  // Anexar button ao elemento pai
  parent.appendChild(button);
};

/*
  --------------------------------------------------------------------------------------
  Function to create a view button with eye icon
  for each item in the list 
  --------------------------------------------------------------------------------------
*/
const insertButtonView = (parent, format) => {
  // Create the button element
  let button = document.createElement("button");
  button.className = "icon-button-view";
  button.onclick = showMap;

  //verify if the source is WMS or WFS
  if (format !== "WMS" && format !== "WFS") {
    button.disabled = true;
    button.title = "Format not supported for view";
  }

  // Create the img element
  let img = document.createElement("img");
  img.src = "img/view.png";
  img.alt = "Button with eye icon";
  img.title = "View"; // Using title as hint

  // Append img to button
  button.appendChild(img);

  // Append button to parent element
  parent.appendChild(button);
};



/*
  --------------------------------------------------------------------------------------
  Function to remove the item from the list according to 
  the click on the delete button
  --------------------------------------------------------------------------------------
*/
function removeElement() {
  let del = document.getElementsByClassName("icon-button-delete");
  // var table = document.getElementById('myTable');
  //console.log(del, del.length, typeof del)
  let i;
  for (i = 0; i < del.length; i++) {
    del[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const dataName = div.getElementsByTagName('td')[0].innerHTML;
      console.log(dataName)
      if (confirm("Are you sure?")) {
        deleteItem(dataName);
        div.remove();
        
        alert("Deleted!");
      }
    };
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (name) => {
  console.log(name)
  let url = 'http://127.0.0.1:5000/data?name=' + name;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Function to remove the item from the list according to 
  the click on the delete button
  --------------------------------------------------------------------------------------
*/
function getElement() {
  let elem = document.getElementsByClassName("icon-button-info");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    elem[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const dataName = div.getElementsByTagName('td')[0].innerHTML;
      console.log(dataName)
      return getData(dataName);
      
    };
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para pegar um dado da lista do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getData = (name) => {
  console.log(name)
  let url = 'http://127.0.0.1:5000/data?name=' + name;
  fetch(url, {
    method: 'get'
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data, typeof data)
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


/*
  --------------------------------------------------------------------------------------
  Function to add a new item with name, area, format, description, 
  creator, source, permitted, copyRight, link, info, coordinateSystem, creationDate, updateDate, checkDate
  --------------------------------------------------------------------------------------
*/
const newData = () => {
  let inputName = document.getElementById("newName").value;
  let inputArea = document.getElementById("newArea").value;
  let inputDescription = document.getElementById("newDescription").value;
  let inputSource = document.getElementById("newSource").value;
  let inputCreator = document.getElementById("newCreator").value;
  let inputPermitted = document.getElementById('yes').checked;
  let inputCopyright = document.getElementById("newCopyright").value;
  let inputLink = document.getElementById("newLink").value;
  let inputInfo = document.getElementById("newInfo").value;
  let inputCoordinateSystem = document.getElementById("newCoordinateSystem").value;
  let inputCreationDate = document.getElementById("newCreationDate").value;
  let inputUpdateDate = document.getElementById("newUpdateDate").value;
  let inputFormat = document.getElementById("newFormat").value;
  let inputCheckDate = new Date();
  if (inputName === '') {
    alert("Write the data name!");
  } else if (inputArea === '') {
    alert("Write the data area");
  } else if (inputLink === '') {
    alert("Write the data link");
  } 
  
  postData(inputName, inputArea, inputDescription, inputSource, 
    inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
    inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
    inputCheckDate, inputFormat)

  showMainContent() 
}

function showInfo() {
  alert("Function not implemented yet!")
}

function showEdit() {
  alert("Function not implemented yet!")
}

function showMap() {
  alert("Function not implemented yet!")
}

function checkData() {
  alert("Function not implemented yet!")
}

function calculateDateDifferenceDays(checkDate) {
  // Converter checkDate para objeto Date
  var checkDateObj = new Date(checkDate);
  // Obter a data atual
  var currentDate = new Date();
  // Calcular a diferença em milissegundos
  var differenceInMilliseconds = currentDate - checkDateObj;
  // Converter a diferença para dias
  var differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  // Ajustar para arredondar para cima se for mais que meio dia
  var differenceInDaysAdjusted = differenceInDays - Math.floor(differenceInDays) > 0.5 ? Math.ceil(differenceInDays) : Math.floor(differenceInDays);
  
  // Retornar a string formatada
  return differenceInDaysAdjusted;
}

/*
  --------------------------------------------------------------------------------------
  Function to insert data information in showed list
  --------------------------------------------------------------------------------------
*/
const insertList = (name, area, permitted, coordinateSystem, 
  checkDate, format, source) => {
  
  var data = [name, area, permitted, coordinateSystem, format, checkDate];

  var differenceInDaysAdjusted = calculateDateDifferenceDays(checkDate);
  // 5. Verificar o número de dias para definir a unidade
  var dayOrDays = differenceInDaysAdjusted <= 1 ? "day" : "days";
  // 6. Atualizar o valor de checkDate com a diferença e a unidade
  data[5] = `${differenceInDaysAdjusted} ${dayOrDays}`;
  var table = document.getElementById('myTable');
  var row = table.insertRow();

 //console.log(data)
  for (var i = 0; i < data.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = data[i];
  }
  if (differenceInDaysAdjusted <= 90) {
    insertButtonCheckGreen(row.insertCell(-1))
  } else {
      insertButtonCheckRed(row.insertCell(-1))
  }
  insertButtonDelete(row.insertCell(-1))
  insertButtonEdit(row.insertCell(-1))
  insertButtonInfo(row.insertCell(-1))
  insertButtonView(row.insertCell(-1), format)

  // Mostra somente a div com a tabela visivel
  document.getElementById("newName").value = "";
  document.getElementById("newArea").value = "ROI - All";
  document.getElementById("newDescription").value = "";
  document.getElementById("newSource").value = "";
  document.getElementById("newCreator").value = "";
  document.getElementById("yes").checked=true;
  document.getElementById("newCopyright").value = "";
  document.getElementById("newLink").value = "";
  document.getElementById("newInfo").value = "";
  document.getElementById("newCoordinateSystem").value = "ITM";
  document.getElementById("newCreationDate").value = "";
  document.getElementById("newUpdateDate").value = "";
  document.getElementById("newFormat").value = "SHP";
  
  
  removeElement()
  
  
}

function openNewDataForm() {
  // Esconde as divs mainContent, editDataContent, e infoDataContent
  document.getElementById('mainContent').classList.add('hidden');
  document.getElementById('editDataContent').classList.add('hidden');
  document.getElementById('infoDataContent').classList.add('hidden');
  
  // Exibe a div newDataContent
  document.getElementById('newDataContent').classList.remove('hidden');
}

function showMainContent() {
  // Esconde as divs newDataContent, editDataContent, e infoDataContent
  document.getElementById('newDataContent').classList.add('hidden');
  document.getElementById('editDataContent').classList.add('hidden');
  document.getElementById('infoDataContent').classList.add('hidden');
  
  // Exibe a div mainContent
  document.getElementById('mainContent').classList.remove('hidden');
}

function showEditDataContent() {
  // Esconde as divs newDataContent, mainContent, e infoDataContent
  document.getElementById('newDataContent').classList.add('hidden');
  document.getElementById('mainContent').classList.add('hidden');
  document.getElementById('infoDataContent').classList.add('hidden');
  
  // Exibe a div editDataContent
  document.getElementById('editDataContent').classList.remove('hidden');
} 

function showInfoDataContent() {
  // Esconde as divs newDataContent, mainContent, e editDataContent
  document.getElementById('newDataContent').classList.add('hidden');
  document.getElementById('mainContent').classList.add('hidden');
  document.getElementById('editDataContent').classList.add('hidden');
  
  // Exibe a div infoDataContent
  document.getElementById('infoDataContent').classList.remove('hidden');
}