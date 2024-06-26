/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/dataset';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.dataset.forEach(item => insertList(item.name, item.area, item.format, 
        item.description, item.creator, item.source, item.permitted, item.copyright, 
        item.link, item.info, item.coordinatesystem, item.creationdate, 
        item.updatedate, item.updatedate, item.checkdate))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputArea, inputFormat,
  inputDescription, inputCreator, inputSource, inputPermitted, inputCopyRight,
  inputLink, inputInfo, inputCoordinateSystem, inputCreationDate,
  inputUpdateDate, inputCheckDate) => {
  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('area', inputArea);
  formData.append('format', inputFormat);
  formData.append('description', inputDescription);
  formData.append('creator', inputCreator);
  formData.append('source', inputSource);
  formData.append('permitted', inputPermitted);
  formData.append('copyRight', inputCopyRight);
  formData.append('link', inputLink);
  formData.append('info', inputInfo);
  formData.append('coordinateSystem', inputCoordinateSystem);
  formData.append('creationDate', inputCreationDate);
  formData.append('updateDate', inputUpdateDate);
  formData.append('checkDate', inputCheckDate);

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
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
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Are you sure?")) {
        div.remove()
        deleteItem(nomeItem)
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
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newData = () => {
  let inputProduct = document.getElementById("newData").value;
  let inputQuantity = document.getElementById("newFormat").value;
  let inputPrice = document.getElementById("newDescription").value;
  let inputCreator = document.getElementById("newCreator").value;
  let inputSource = document.getElementById("newSource").value;
  let inputPermitted = document.getElementById("newPermitted").value;
  let inputCopyRight = document.getElementById("newCopyRight").value;
  let inputLink = document.getElementById("newLink").value;
  let inputInfo = document.getElementById("newInfo").value;
  let inputCoordinateSystem = document.getElementById("newCoordinateSystem").value;
  let inputCreationDate = document.getElementById("newCreationDate").value;
  let inputUpdateDate = document.getElementById("newUpdateDate").value;
  let inputCheckDate = document.getElementById("newCheckDate").value;
  
  if (inputData === '') {
    alert("Write a data!");
  } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputData, inputFormat, inputCreator, inputSource, 
      inputPermitted, inputCopyRight, inputLink, inputInfo, 
      inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
      inputCheckDate)
    postItem(inputData, inputFormat, inputCreator, inputSource, 
      inputPermitted, inputCopyRight, inputLink, inputInfo, 
      inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
      inputCheckDate)
    alert("Data added!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, format,description, creator,
  source, permitted, copyRight, link, info, coordinateSystem,
  creationDate, updateDate, checkDate) => {
  var item = [name, format, description, creator, source, 
    permitted, copyRight, link, info, coordinateSystem, 
    creationDate, updateDate, checkDate]
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newData").value = "";
  document.getElementById("newFormat").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("newCreator").value = "";
  document.getElementById("newSource").value = "";
  document.getElementById("newPermitted").value = "";
  document.getElementById("newCopyRight").value = "";
  document.getElementById("newLink").value = "";
  document.getElementById("newInfo").value = "";
  document.getElementById("newCoordinateSystem").value = "";
  document.getElementById("newCreationDate").value = "";
  document.getElementById("newUpdateDate").value = "";
  document.getElementById("newCheckDate").value = "";
  
  removeElement()
}