# GSW-PS
GSW - Processo Seletivo Embraer

<img width="1512" alt="image" src="https://user-images.githubusercontent.com/38021698/211438621-cd9f947b-a890-4b65-8fb7-54c3f94471d1.png">

O programa é um simulador de caixa eletrônico, mostrando na tela a quantidade de cédulas recebidas após enviar um valor de saque. 

Vá para a pasta gsw-back e siga os seguintes comandos:

###  `docker-compose down`
###  `docker-compose build`
###  `docker-compose up -d`

Após iniciar a aplicação, rode um script para adição de informações no banco de dados

### `yarn fill-db`

Em seguida, rode o client na pasta gsw-front

### `yarn dev`



