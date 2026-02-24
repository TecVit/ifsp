/*
Elabore um programa que leia a altura de 5 pessoas. Cada altura deve ser informada
em metros, como um número com duas casas decimais (por exemplo: 1.65). O
programa deve informar a menor altura, a maior altura e a média de altura das 5
pessoas.
*/

#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> alturas;
    float menor = 0;
    float maior = 0;
    float media = 0;

    for (int i = 0; i < 5; i++) {
        float altura;
        cin >> altura;

        if (altura > maior || i == 0) {
            maior = altura;
        }

        if (altura < menor || i == 0) {
            menor = altura;
        }

        media += altura;
    }

    media = media / 5;

    cout << "A menor altura é: " << menor << endl;
    cout << "A maior altura é: " << maior << endl;
    cout << "A média das alturas é: " << media << endl;

    return 0;
}