<h1 align="center">Tech Pro Bem - Saúde da Rua</h1>
<blockquote align="left">Este projeto possui o objetivo principal de construir uma aplicação Back-end, de custo zero, para a ONG Saúde da Rua que tem como missão levar atendimento médico humanizado e recorrente às camadas mais vulneráveis da sociedade.</blockquote>

## Inicialização:
<p>Para executar o projeto é necessário ter instalado o <a href="https://nodejs.org/en/">Node.js</a>, o <a href="https://www.serverless.com/framework/docs/getting-started">Serverless framework</a> e uma conta <a href="https://aws.amazon.com/">AWS</a>.<br>
 Faça o clone do projeto e configure seu perfil no arquivo Serverless.</p>
 
## Ferramentas:

<ul>
    <li> <a href="https://nodejs.org/en/">Node</a> </li>
    <li> <a href="https://www.typescriptlang.org/">Typescript</a> </li>
    <li> <a href="https://www.serverless.com/framework/docs/getting-started">Serverless Framework</a> </li>
    <li> <a href="https://aws.amazon.com/pt/lambda/">AWS Lambda</a> </li>
    <li> <a href="https://aws.amazon.com/pt/dynamodb/">Amazon DynamoDB</a> </li>
    <li> <a href="https://aws.amazon.com/pt/s3/">Amazon S3</a> </li>
    <li> <a href="https://aws.amazon.com/pt/api-gateway/">Amazon API Gateway</a> </li>
    <li> <a href="https://aws.amazon.com/pt/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc">Amazon SNS</a> </li>
</ul>

## Dependências de desenvolvimento:

<ul> 
    <li> <a href="https://www.npmjs.com/package/eslint-config-airbnb-base">Eslint (eslint-config-airbnb-base)</a> </li>
    <li> <a href="https://prettier.io/">Prettier</a> </li>
    <li> <a href="https://www.serverless.com/plugins/serverless-plugin-typescript">Plugin do Typescript para o Serverless (serverless-plugin-typescript)</a> </li>
    <li> <a href="https://www.npmjs.com/package/aws-sdk">AWS Software Dev. Kit (aws-sdk)</a> </li>
    <li> <a href="https://aws.amazon.com/pt/lambda/">AWS Lambda Functions (aws-lambda)</a> </li>
    <li> <a href="https://jestjs.io/pt-BR/">Jest</a> </li>
    
</ul>

## Dependências de produção:

<ul> 
    <li> <a href="https://www.npmjs.com/package/jsonwebtoken">JSON Web Token (jsonwebtoken)</a> </li>
    <li> <a href="https://joi.dev/">JOI</a> </li>
    <li> <a href="https://nodemailer.com/about/">Nodemailer</a> </li> 
</ul>
    
## Links importantes:

<ul> 
    <li> <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html">Amazon CloudWatch Logs</a> </li>
    <li> <a href="https://aws.amazon.com/pt/iam/">AWS CloudFormation</a> </li>
</ul>

## Análise Técnica:

### Descrição do ambiente técnico

<p>O sistema é composto por um banco de dados, funções lambdas AWS e um serviço gerenciado que fornece entrega de mensagens de editores para assinantes (SNS).</p>
<p>As funcionalidades principais são: </p> 
<ul> 
    <li>F1  - Cadastro de administradores com nível de permissão</li>
    <li>F2  - CRUD de voluntários</li>
    <li>F3  - Criação e remoção de PDF's.</li>
    <li>F4  - Criação e remoção de Imagens.</li>
</ul>

<p>As ferramentas utilizadas para o desenvolvimento incluem <strong>Node.js</strong> que é uma linguagem de programação utilizada para o Back-end, para front-end foi utilizado <strong>React</strong>. <strong>DynamoDB</strong> atuando como banco de dados não relacional e o <strong>Serverless</strong> framework para configurar o ambiente, e o <strong>Yarn</strong> como gerenciador de pacotes</p>

### Requisitos funcionais

<ul> 
    <li>RF1  - Criação de painel para administradores</li>
    <li>RF2  - Formulário para cadastro de voluntários</li>
    <li>RF3  - Adicionar e remover PDF's.</li>
    <li>RF4  - Adicionar e remover imagens.</li>
</ul>

<!--Regras de negócio:-->

## Casos de uso:

### Mensagens Internas

<p>Rotas utilizadas pela aplicação web para executar metodos de POST e GET no banco de dados. Onde o retorno de cada uma das funções estará contido em uma sessão para renderização de páginas web.</p>

| Verbo | Rota | Funcionalidade|
|-------|------|---------------|
|```POST```|/login|Faz login como administrador.|
|```POST``` |/create/admin|Cria um usuário adiministrador.|
|```POST``` |/create/volunteer|Cria um usuário voluntário.|
|```GET``` |/get/volunteers|Lista os usuários voluntários do banco de dados.|
|```GET``` |/get/one_volunteer|Exibe um usuário em particular.|
|```GET``` |/verify/volunteer-email|Verifica o email de um usuário voluntário.|
|```PUT``` |/update/volunteer/{email}|Atualiza um usuário em particular.|

## Conceitos básicos:
* <p><a href="https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530">SOLID</a> - SOLID são cinco princípios da programação orientada a objetos que facilitam no desenvolvimento de softwares, tornando-os fáceis de manter e estender. Esses princípios podem ser aplicados a qualquer linguagem de POO.</p>

### Futuras implementações:

-   Filtros de consulta no painel de administrador;
-   Consultas complexas;
-   Documentação de API com Swagger UI com deploy no Github Pages

