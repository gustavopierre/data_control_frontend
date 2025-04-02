# Meu Front
A aplicacao Data Control teve origem como MVP da Sprint  **Desenvolvimento Full Stack Básico** e foi complementado para atender o MVP da Sprint **Arquitetura de Software** do curso de Pos-Graduacao em Engenharia de Software da PUC-Rio.

Sua funcao e o frontend de um sistema de controle dos dados usados para serem camadas (layers) nos softwares de geoprocessamento. As principais tecnologias utilizadas sao:
---
 - [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
 - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
 - [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
 - [Leaflet](https://leafletjs.com/reference.html)
 - [Docker](https://www.docker.com/)


## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t front_datacontrol .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 8080:80 front_datacontrol
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/](http://localhost:8080/) no navegador.


## Funcionamento dos Botões

### Botão de Check Verde
<img src="src/img/check_green.png" alt="Check Verde" width="20" height="20" />
- Indica que o dado foi verificado recentemente (menos de 90 dias).

### Botão de Check Vermelho
<img src="src/img/check_red.png" alt="Check Vermelho" width="20" height="20" />
- Indica que o dado não foi verificado recentemente (mais de 90 dias).

### Botão de Deletar
<img src="src/img/close.png" alt="Deletar" width="20" height="20" />
- Remove o dado da lista.

### Botão de Editar
<img src="src/img/pen.png" alt="Editar" width="20" height="20" />
- Permite editar as informações do dado. Funcao ainda nao implementada.

### Botão de Informação
<img src="src/img/information.png" alt="Informação" width="20" height="20" />
- Exibe informações detalhadas sobre o dado. Função ainda não implementada.

### Botão de Visualizar
<img src="src/img/view.png" alt="Visualizar" width="20" height="20" />
- Abre uma visualização do dado no mapa (apenas para dado do tipo Web Feature Server - WFS).

- A [Data Control API](https://github.com/gustavopierre/data_control_API) possui um banco de dados populado com alguns poucos exemplos para testar o acesso à API externa por conta do frontend.
- As APIs externas são de fontes reais utilizadas por empresas de Planejamento de Energia Renovável para avaliação de áreas apropriadas para instalação de fazendas solares e eólicas. Como por exemplo: [An Bord Pleanala](https://www.pleanala.ie/en-ie/home) e sua [API](https://services-eu1.arcgis.com/o56BSnENmD5mYs3j/ArcGIS/rest/services/Cases_2016_Onwards/FeatureServer/3) que retorna as Aplicações Planejadas na Irlanda.
- As APIs externas têm formato JSON de retorno, que é transformado em GeoJSON e exibido num mapa usando a biblioteca Leaflet.
  
### TODO List
- Implementar as funcionalidades dos botões não implementadas ainda.
- Permitir a paginação dos dados oriundos da API externa, sendo possível exibir números elevados de registros no mapa, atualmente limitado a até 2000 elementos.
- Permitir um zoom na área dos dados da API externa quando eles são exibidos.