/*
  --------------------------------------------------------------------------------------
  Function to obtain the existing list from the server by GET request
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://localhost:5000/dataset';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received from server:", data);
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

  let url = 'http://localhost:5000/data';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        insertList(inputName, inputArea, inputPermitted, inputCoordinateSystem, inputCheckDate, inputFormat)
        alert("Data added!")
        //getList()
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
  Function to update a data in the server list by PUT request
  --------------------------------------------------------------------------------------
*/

const putData = (name, inputArea, inputDescription, inputSource, 
  inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
  inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
  inputCheckDate, inputFormat) => {
  
  const formData = new FormData();
  formData.append('name', name);
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

  let url = 'http://localhost:5000/data';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        alert("Data updated successfully!");
        // Optionally, refresh the list or update the UI
        getList();
      } else if (response.status === 404) {
        alert("Data not found!");
      } else {
        alert("Error updating data!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Failed to update data!");
    });
};

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
const insertButtonView = (parent, format, source) => {
  // Create the button element
  let button = document.createElement("button");
  button.className = "icon-button-view";

  //check if the source is defined before to set the onclick event
  if(!source) {
    console.warn("Source is missing for view button");
    button.disabled = true;
    button.title = "Source is missing!";
  } else {
    button.onclick = () => {
      console.log("Source: ", source);
      showMap(source)
    };
  }

  //verify if the source is WFS
  if (format !== "WFS") {
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
      // Go to the parent element of the button and then to the parent element of the div
      let div = this.parentElement.parentElement;
      // Get the content of the first cell (td) in the row (tr). It is the name of the data
      const dataName = div.getElementsByTagName('td')[0].innerHTML;
      console.log(dataName)
      if (confirm("Are you sure?")) {
        // Call the function to delete the item from the server
        deleteItem(dataName);
        // Call the function to delete the item from the list
        div.remove();
        
        alert("Deleted!");
      }
    };
  }
}
/*
  --------------------------------------------------------------------------------------
  Function to edit the item from the list according to 
  the click on the edit button
  --------------------------------------------------------------------------------------
*/
function editElement() {
  // get the edit button elements
  let edit = document.getElementsByClassName("icon-button-edit");
  let i;
  for (i = 0; i < edit.length; i++) {
    edit[i].onclick = function () {
      // Go to the parent element of the button and then to the parent element of the div
      let div = this.parentElement.parentElement;
      // Get the content of the first cell (td) in the row (tr). It is the name of the data
      const dataName = div.getElementsByTagName('td')[0].innerHTML;
      console.log(dataName)
      // Call the function to edit the item from the server
      getData(dataName)
        .then((data) => {
          if (data) {
            // Fill the fields in the editDataContent div
            document.getElementById("editName").value = data.name || "";
            document.getElementById("editArea").value = data.area || "";
            document.getElementById("editDescription").value = data.description || "";
            document.getElementById("editLink").value = data.link || "";
            document.getElementById("editFormat").value = data.format || "";
            document.getElementById("editCoordinateSystem").value = data.coordinate_system || "";
            document.getElementById("editSource").value = data.source || "";
            document.getElementById("editCreator").value = data.creator || "";
            document.getElementById("editCreationDate").value = data.creation_date || "";
            document.getElementById("editUpdateDate").value = data.update_date || "";
            document.getElementById("editCopyright").value = data.copyright || "";
            document.getElementById("editInfo").value = data.info || "";
    
            // Set the permitted radio button
            if (data.permitted) {
              document.getElementById("yesEdit").checked = true;
            } else {
              document.getElementById("noEdit").checked = true;
            }
            // Show the editDataContent div
            showEditDataContent();
          } else {
            console.error("Data not found for editing:", dataName);
            alert("Dado nao achado!");
          }
        }) 
        .catch((error) => {
          console.error("Error fetching data for editing:", error);
          alert("Erro ao buscar dados para edição!");
        })     
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
  let url = 'http://localhost:5000/data?name=' + name;
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
  let url = 'http://localhost:5000/data?name=' + name;
  return fetch(url, {
    method: 'get'
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error (`HTTP error! status: $response.status}`);
    }
    return response.json();
  })
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
  } else {
      // Call the function to insert the data in the server list
    postData(inputName, inputArea, inputDescription, inputSource, 
      inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
      inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
      inputCheckDate, inputFormat)
      
    
    // Call the function to show the MainContent
    showMainContent() 
  }
}

/*
  --------------------------------------------------------------------------------------
  Function to edit a item with name, area, format, description,
  creator, source, permitted, copyRight, link, info, coordinateSystem, creationDate, updateDate, checkDate
  --------------------------------------------------------------------------------------
*/
const saveEditedData = () => {
  let name = document.getElementById("editName").value;
  let inputArea = document.getElementById("editArea").value;
  let inputDescription = document.getElementById("editDescription").value;
  let inputSource = document.getElementById("editSource").value;
  let inputCreator = document.getElementById("editCreator").value;
  let inputPermitted = document.getElementById('yes').checked;
  let inputCopyright = document.getElementById("editCopyright").value;
  let inputLink = document.getElementById("editLink").value;
  let inputInfo = document.getElementById("editInfo").value;
  let inputCoordinateSystem = document.getElementById("editCoordinateSystem").value;
  let inputCreationDate = document.getElementById("editCreationDate").value;
  let inputUpdateDate = document.getElementById("editUpdateDate").value;
  let inputFormat = document.getElementById("editFormat").value;
  let inputCheckDate = new Date();
  if (inputLink === '') {
    alert("Write the data link");
  } else {
      // Call the function to insert the data in the server list
    putData(name, inputArea, inputDescription, inputSource, 
      inputCreator, inputPermitted, inputCopyright, inputLink, inputInfo,
      inputCoordinateSystem, inputCreationDate, inputUpdateDate, 
      inputCheckDate, inputFormat)
      
    
    // Call the function to show the MainContent
    showMainContent() 
  }
  
   
}

function showInfo() {
  alert("Function not implemented yet!")
}

function showEdit() {
  alert("Function not implemented yet!")
}

function showMap(source) {
  if (!source) {
    alert("Source is missing!")
    return;
  }
  // Add the query endpoint to the source URL
  const queryUrl = `${source}/query`;
  const params = new URLSearchParams({
    where: "1=1",
    outFields: "*",
    f: "json", // Formato JSON
    outSR: 4326,
    resultRecordCount: 2000
  });

  console.log("Query URL:", `${queryUrl}?${params.toString()}`);
  // Request the data from the source with the query parameters
  fetch(`${queryUrl}?${params.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load map data from ${queryUrl}`);
      }
      return response.json();
    })
    .then(data => {
      // Exibir o JSON original no console
      console.log("Original JSON:", data);
      //transform the data to GeoJSON format
      const geoJsonData = {
        type: 'FeatureCollection',
        features: data.features.map(item => {
          let geometry = null;

          // convertion based on the geometry type
          switch (data.geometryType) {
            case "esriGeometryPoint":
              geometry = {
                type: 'Point',
                coordinates: [item.geometry.x, item.geometry.y]
              };
              break;
            case "esriGeometryMultipoint":
              geometry = {
                type: 'Multipoint',
                coordinates: item.geometry.points
              };
              break;
            case 'esriGeometryPolyline':
              geometry = {
                type: 'MultiLineString',
                coordinates: item.geometry.paths
              };
              break;
            case 'esriGeometryPolygon':
              geometry = {
                type: 'Polygon',
                coordinates: item.geometry.rings
              };
              break;
            default:
              console.warn('Unsupported geometry type:', item.geometryType);
              return null;
          }
        
          
          if (!item.geometry || !item.attributes) {
            console.warn("Invalid feature:", item);
            return null;
          }
          return {
            type: "Feature",
            geometry: geometry,
            properties: item.attributes
          };
        }).filter(feature => {
          if (feature.geometry === null) {
            console.warn("Discarded feature with null geometry:", feature);
            return false;
          }
          return true;
        })
      };
  console.log("Generated GeoJSON:", geoJsonData); // Verificar o GeoJSON gerado  
  //Open a new window with the map
  const mapWindow = window.open("", '_blank', "width=800, height=600");
  mapWindow.document.write(`
    <html>
      <head>
        <title>Map Viewer</title>
        <style>
          #map {
            width: 100%;
            height: 100%;
          }
        </style>
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([0, 0], 2); // Inicializa o mapa
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          // Add GeoJSON data to the map
          const geoJsonLayer = L.geoJSON(${JSON.stringify(geoJsonData)});
          geoJsonLayer.addTo(map);
          if (geoJsonLayer.getBounds().isValid()) {
            map.fitBounds(geoJsonLayer.getBounds());
          } else {
            console.warn("No valid bounds found for GeoJSON data.");
          }
        </script>
      </body>
    </html>
    `);
  })
  .catch(error => {
    console.error('Error loading map data',error);
    //alert("Failed to load map data.");
    alert(`Failed to load map data.`);
  });
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
  insertButtonView(row.insertCell(-1), format, source)

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
  editElement()
  
  
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
  //document.getElementById('newDataContent').classList.add('hidden');
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

