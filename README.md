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
$ docker build -t nome_da_sua_imagem .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 8080:80 nome_da_sua_imagem
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.