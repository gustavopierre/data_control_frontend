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
        item.description, item.source, item.creator, item.permitted, 
        item.copyright, item.link, item.info, item.coordinate_system, 
        item.creation_date, item.update_date, item.check_date, 
        item.format))
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
        insertList(inputName, inputArea, inputDescription, inputSource, 
          inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
          inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
          inputCheckDate, inputFormat)
          alert("Data added!")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const dataName = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Are you sure?")) {
        div.remove()
        deleteItem(dataName)
        alert("Deleted!")
      }
    }
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
  let inputPermitted = document.getElementById("newPermitted").value;
  let inputCopyright = document.getElementById("newCopyright").value;
  let inputLink = document.getElementById("newLink").value;
  let inputInfo = document.getElementById("newInfo").value;
  let inputCoordinateSystem = document.getElementById("newCoordinateSystem").value;
  let inputCreationDate = document.getElementById("newCreationDate").value;
  let inputUpdateDate = document.getElementById("newUpdateDate").value;
  let inputCheckDate = document.getElementById("newCheckDate").value;
  let inputFormat = document.getElementById("newFormat").value;
  
  if (inputName === '') {
    alert("Write the data name!");
  } else if (inputFormat === '') {
    alert("Write the data format");
  } else {
    insertList(inputName, inputArea, inputDescription, inputSource, 
      inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
      inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
      inputCheckDate, inputFormat)
    postData(inputName, inputArea, inputDescription, inputSource, 
      inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
      inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
      inputCheckDate, inputFormat)
    alert("Data added!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Function to insert data information in showed list
  --------------------------------------------------------------------------------------
*/
const insertList = (name, area, description, source, creator, permitted, 
  copyright, link, info, coordinateSystem, creationDate, updateDate, 
  checkDate, format) => {
  var data = [name, area, permitted, coordinateSystem, checkDate, format]
  // Supondo que checkDate seja uma string no formato ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
  var checkDate = data[4]; // Acessando a variável checkDate do array

  // 1. Converter checkDate para objeto Date
  var checkDateObj = new Date(checkDate);

  // 2. Obter a data atual
  var currentDate = new Date();

  // 3. Calcular a diferença em milissegundos
  var differenceInMilliseconds = currentDate - checkDateObj;

  // 4. Converter a diferença para dias
  var differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // Ajustar para arredondar para cima se for mais que meio dia
  var differenceInDaysAdjusted = differenceInDays - Math.floor(differenceInDays) > 0.5 ? Math.ceil(differenceInDays) : Math.floor(differenceInDays);

  // 5. Verificar o número de dias para definir a unidade
  var dayOrDays = differenceInDaysAdjusted <= 1 ? "day" : "days";

  // 6. Atualizar o valor de checkDate com a diferença e a unidade
  data[4] = `${differenceInDaysAdjusted} ${dayOrDays}`;

  var table = document.getElementById('myTable');
  var row = table.insertRow();
  
  for (var i = 0; i < data.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = data[i];
  }
  insertButton(row.insertCell(-1))
  insertButton(row.insertCell(-1))
  insertButton(row.insertCell(-1))
  document.getElementById("newName").value = "";
  document.getElementById("newArea").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("newSource").value = "";
  document.getElementById("newCreator").value = "";
  document.getElementById("newPermitted").value = "";
  document.getElementById("newCopyright").value = "";
  document.getElementById("newLink").value = "";
  document.getElementById("newInfo").value = "";
  document.getElementById("newCoordinateSystem").value = "";
  document.getElementById("newCreationDate").value = "";
  document.getElementById("newUpdateDate").value = "";
  document.getElementById("newCheckDate").value = "";
  document.getElementById("newFormat").value = "";
  
  removeElement()
}