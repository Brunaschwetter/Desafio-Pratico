Desafio Prático: Automação de Testes em uma Aplicação Web

Descrição do Desafio: Criar um conjunto de testes automatizados para a funcionalidade de login de uma aplicação web fictícia. A aplicação possui os seguintes elementos:
• URL da Aplicação:
  - A aplicação está disponível em [URL da Aplicação].
• Página de Login:
  - A página de login contém campos para "Nome de Usuário" e "Senha".
  - O botão "Entrar" é utilizado para submeter as credenciais.
• Cenários de Teste:
  - Crie testes automatizados para os seguintes cenários:
▪ Login com credenciais válidas.
▪ Login com nome de usuário inválido.
▪ Login com senha inválida.
▪ Tentativa de login sem preencher nenhum campo.

PLANEJAMENTO - 
1. No momento os testes somente estão sendo executados, porém ainda não estão gerando evidencias.
2. Será criado um mecanismo de gerar evidências. 

PRÉ REQUISITOS - 
1. Certifique-se de ter o Python instalado em seu sistema.
2. Certifique-se de ter o ChromeDriver instalado e configurado em seu sistema. O ChromeDriver é necessário para automatizar o navegador Google Chrome.
3. Instale o pacote selenium para Python

CONFIGURAÇÃO - 
1. Copie o código fornecido para um arquivo Python com a extensão .py
2. Abra o arquivo desafio.py no VS
3. Certifique-se de que a URL fornecida na linha self.driver.get("http://www.tester.com.br") seja a URL correta para a página de login que deseja testar

EXECUÇÃO - 
1. Abra o prompt de comando
2. Navegue até o diretório onde você salvou o arquivo desafio.py
3. Execute o arquivo desafio.py usando o Python. Você pode fazer isso digitando o seguinte comando no terminal ou prompt de comando: python test_login.py
4. Os testes serão executados e você verá a saída no terminal indicando se os testes passaram ou falharam
5. Após a execução dos testes, o navegador será fechado automaticamente
