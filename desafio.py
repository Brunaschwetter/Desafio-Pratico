import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class TestLogin(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome() # ou outro driver de navegador de sua escolha
        self.driver.get("http://www.tester.com.br")

    def test_login_credenciais_validas(self):
        username = "usuario_valido"
        password = "senha_valida"
        self.login(username, password)
        self.assertTrue(self.driver.current_url == "http://www.tester.com.br/dashboard")

    def test_login_nome_usuario_invalido(self):
        username = "usuario_invalido"
        password = "senha_valida"
        self.login(username, password)
        error_message = self.driver.find_element_by_xpath("//div[contains(text(), 'Nome de usuário inválido')]").text
        self.assertEqual(error_message, "Nome de usuário inválido")

    def test_login_senha_invalida(self):
        username = "usuario_valido"
        password = "senha_invalida"
        self.login(username, password)
        error_message = self.driver.find_element_by_xpath("//div[contains(text(), 'Senha inválida')]").text
        self.assertEqual(error_message, "Senha inválida")

    def test_login_sem_preencher_campos(self):
        self.driver.find_element_by_id("login_button").click() # Simula clique no botão de login
        error_message = self.driver.find_element_by_xpath("//div[contains(text(), 'Por favor, preencha todos os campos')]").text
        self.assertEqual(error_message, "Por favor, preencha todos os campos")

    def login(self, username, password):
        self.driver.find_element_by_id("username").send_keys(username)
        self.driver.find_element_by_id("password").send_keys(password)
        self.driver.find_element_by_id("login_button").click() # Simula clique no botão de login

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()