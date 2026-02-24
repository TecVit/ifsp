/*
Elabore um programa que repita a leitura de uma senha até que ela seja válida. Para
cada leitura de senha incorreta informada, escrever a mensagem "Senha Invalida".
Quando a senha for informada corretamente deve ser impressa a mensagem "Acesso
Permitido" e o programa encerrado. Considere que a senha correta é o valor 2002.
*/

#include <iostream>
#include <string>
using namespace std;

int main() {
    string senha = "";
    
    while (true) {
        cin >> senha;

        if (senha != "2002") {
            cout << "Senha Invaliva" << endl;
        } else {
            break;
        }
    }

    cout << "Acesso Permitido" << endl;

    return 0;
}
