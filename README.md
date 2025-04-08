# Data Control Frontend 
## Introducao
A aplicação Data Control teve origem como MVP da Sprint **Desenvolvimento Full Stack Básico** e foi complementada para atender o MVP da Sprint **Arquitetura de Software** do curso de Pós-Graduação em Engenharia de Software da PUC-Rio.
A aplicacao controla os dados utilizados para serem camadas de mapas em softwares de GIS na empresa em que trabalho. Identifiquei, ha algum tempo, que os dados sao dinamicos e os mapas devem ser o mais atualizados possivel. Nao existia uma politica de frequencia de atualizacao desses dados. Com a aplicacao DataControl, cada dado recebe uma informacao de qual a frequencia, em dias, que cada dado deve ser atualizado. Na versao atual, ele mostra na lista de dados, em quantos dias cada dado deve ser checado quanto a existencia de atualizacao. Quando o dado é do tipo Web Feature Server (WFS), o dado do bounding box dos dados geográficos é obtido via API REST externa, cujo link consta como um dos campos de informação daquele dado. A arquitetura da aplicação é representada visualmente na figura abaixo:

<p align="center">
  <img src="src\img\cenario.png" alt="Arquitetura do sistema" width="400"/>
  <br/>
  <strong>Figura 1</strong> – Arquitetura da aplicação
</p>

## Componentes
Os componentes da aplicação são:

 - Frontend - Interface que acessa a [Data Control API](https://github.com/gustavopierre/data_control_API), exibindo uma lista de dados utilizados nos softwares de GIS, com informações básicas e, principalmente, há quantos dias foi a última checagem e quantos dias faltam para que seja realizada a próxima verificação. Existe um botão para inserir um novo dado no banco de dados e, cada registro na lista, tem botões que permitem:
     - Considerar checado o dado, renovando assim a data da última checagem e a quantidade de dias para a próxima checagem.
     - Excluir um dado do banco de dados.
     - Editar as informações de um dado selecionado, inclusive o retângulo envolvente (bounding box), obtido pela API externa, caso o dado seja do tipo Web Feature Server (WFS) compatível com o formato JSON da ESRI, que é, atualmente, a maioria dos dados WFS utilizados na empresa.
     - Exibir informações do dado selecionado.
     - Visualizar o dado num mapa, caso ele seja do tipo Web Feature Server (WFS) compatível com o formato JSON da ESRI.
 - Backend - Contendo API que implementa rotas de busca de dados no banco de dados, busca de um dado específico, alteração de dados, inserção de dados, deleção de dado, busca de dados por área e atualização da data de checagem do dado. A API é documentada utilizando o [Swagger](https://swagger.io/).
 - Banco de Dados - É utilizado um banco de dados sqlite3, sem suporte a GIS. Apesar da API criar um banco de dados novo na ausência do arquivo de banco de dados, foi deixado um banco de dados populado com alguns poucos registros, para que possam ser testadas as funcionalidades da aplicação.
 - API externa - A interface possibilita o acesso a APIs externas de dados cadastrados do tipo Web Feature Server (WFS) compatível com o formato JSON da ESRI, salvando o retângulo envolvente (bounding box) de um dado novo ou alterando-o, de um dado existente, em virtude de sua atualização.

## Docker
A aplicação pode ser clonada do GitHub e executada criando um ambiente com os devidos requisitos ou utilizando containers [Docker](https://www.docker.com/). Criam-se duas imagens, uma para o frontend e outra para o backend, conforme instruções nos respectivos repositórios, e executam-se essas imagens. Os arquivos README.md têm instruções para criação das imagens, execução delas e execução do frontend ou do backend.

## Detalhamento
O Frontend Data Control é o frontend da aplicação de controle dos dados usados para serem camadas (layers) nos softwares de geoprocessamento. As principais tecnologias utilizadas são:

 - [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
 - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
 - [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
 - [Leaflet](https://leafletjs.com/reference.html)
 - [Docker](https://www.docker.com/)

### *Execução*
#### 1) Sem Docker
Uma vez a [API Data Control](https://github.com/gustavopierre/data_control_API) estiver executando localmente sem Docker, conforme **instruções** no repositório, basta clonar o repositório para a máquina local e abrir o arquivo **src/index.html** no navegadoir de sua preferência.

#### 2) Usando Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t front_datacontrol .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, o seguinte comando:

```
$ docker run -d -p 8080:80 front_datacontrol
```

Para acessar o frontend, basta abrir o [http://localhost:8080/](http://localhost:8080/) no navegador.


### *Interfaces e Botões*
<p align="center">
  <img src="src\img\mainInterface.jpg" alt="Interface mostrando a lista de dados" width="400"/>
  <br/>
  <strong>Figura 2</strong> – Interface Principal
</p>


#### Botão de New Data
<img src="src\img\newDataButton.jpg" alt="New Data"/>
- Abre a interface para cadastro de um dado novo (menos de 90 dias).

#### Botão de Check Verde
<img src="src/img/check_green.png" alt="Check Verde" width="20" height="20" />
- Indica que o dado foi verificado recentemente (menos de 90 dias).

#### Botão de Check Vermelho
<img src="src/img/check_red.png" alt="Check Vermelho" width="20" height="20" />
- Indica que o dado não foi verificado recentemente (mais de 90 dias).

#### Botão de Deletar
<img src="src/img/close.png" alt="Deletar" width="20" height="20" />
- Remove o dado.

#### Botão de Editar
<img src="src/img/pen.png" alt="Editar" width="20" height="20" />
- Permite editar as informações do dado. Função ainda não implementada.

#### Botão de Informação
<img src="src/img/information.png" alt="Informação" width="20" height="20" />
- Exibe informações detalhadas sobre o dado. Função ainda não implementada.

#### Botão de Visualizar
<img src="src/img/view.png" alt="Visualizar" width="20" height="20" />
- Abre uma visualização do dado no mapa (apenas para dados do tipo Web Feature Server - WFS). O botao acessa a API externa constante no campo source do dado, converte o JSON em GeoJSON e exibe o dado num mapa.

<br>A [Data Control API](https://github.com/gustavopierre/data_control_API) possui um banco de dados populado com alguns poucos exemplos para testar o acesso à API externa usando o frontend.
<br>As APIs externas são de fontes reais utilizadas por empresas de Planejamento de Energia Renovável para avaliação de áreas apropriadas para instalação de fazendas solares e eólicas. Como por exemplo: [Road Strategy Wicklow County Development Plan 2022 - 2028](https://www.wicklow.ie/Living/CDP2021) e sua [API](https://services.arcgis.com/hQOfkHGHCu8mgDpG/ArcGIS/rest/services/Road%20Strategy_CDP_2022_2028/FeatureServer/0) que retorna as dados de Planejamento Estratégico referente a estradas do Condado de Wicklow, na Irlanda.
<br>As APIs externas têm formato JSON de retorno, que é transformado em GeoJSON e exibido num mapa usando a biblioteca Leaflet.
  
<p align="center">
  <img src="src\img\newDataInterface.jpg" alt="Interface com campos em branco para preenchimento de informacoes de um dado novo" width="400"/>
  <br/>
  <strong>Figura 3</strong> – Interface de Cadastro de um Dado Novo
</p>

#### Botão Get BB from External API
<img src="src\img\getBBfromexternalAPIButton.jpg" alt="Get BB from External API"/>
- Abre uma visualização do dado no mapa (apenas para dados do tipo Web Feature Server - WFS). O botão acessa a API externa constante no campo source do dado, converte o JSON em GeoJSON, exibe o dado num mapa, calcula as coordenadas do retângulo envolvente (bounding box) e adiciona ao campo correspondente no formulário.

#### Botão Add Data
<img src="src\img\AddButton.jpg" alt="Botao com Add escrito"/>
- Adiciona o dado ao banco de dados.

#### Botão Cancel
<img src="src\img\cancelButton.jpg" alt="Botao com Cancel escrito"/>
- Cancela a inclusao do dado e retorna a Interface Principal.

<p align="center">
  <img src="src\img\editDataInterface.jpg" alt="Interface com campos preenchidos com informacoes de um dado existente para alteracao" width="400"/>
  <br/>
  <strong>Figura 4</strong> – Interface de Alteracao de um Dado
</p>

#### Botão Get BB from External API
<img src="src\img\getBBfromexternalAPIButton.jpg" alt="Get BB from External API" />
- Abre uma visualização do dado no mapa (apenas para dados do tipo Web Feature Server - WFS). O botao acessa a API externa constante no campo source do dado, converte o JSON em GeoJSON, exibe o dado num mapa, calcula as coordenadas do retangulo envolvente (bounding box) e altera o conteudo do campo correspondente no formulario.

#### Botão Save Data
<img src="src\img\saveButton.jpg" alt="Botao com Save escrito"/>
- Altera o dado no banco de dados.

#### Botão Cancel
<img src="src\img\cancelButton.jpg" alt="Botao com Cancel escrito"/>
- Cancela a alteracao do dado e retorna a Interface Principal.

### TODO List
- Implementar as funcionalidades dos botões não implementadas ainda.
- Permitir a paginação dos dados oriundos da API externa, sendo possível exibir números elevados de registros no mapa, atualmente limitado a até 2000 elementos.
- Permitir a leitura de outros formatos de JSON retornados em outras API REST externas de dados do tipo WFS
- Permitir a leitura de outros tipos de dados Geograficos e sua exibicao no mapa.
- Permitir um zoom na área dos dados da API externa quando eles são exibidos.
- Melhorar a interacao com os mapas com os dados geograficos mostrados.