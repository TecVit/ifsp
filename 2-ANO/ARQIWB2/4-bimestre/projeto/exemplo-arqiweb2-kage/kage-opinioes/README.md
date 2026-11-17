# 影 Kage — Cultura japonesa no Brasil

Projeto de **exemplo** da disciplina ARQIWEB2 (IFSP — Campus Araraquara).
Mesma arquitetura que vocês vão usar no projeto do bimestre, com outro tema:
React + Vite na frente, Supabase atrás, publicação no Netlify.

---

## Rodar na sua máquina

```bash
npm install
cp .env.example .env     # e preencha com as suas chaves
npm run dev
```

O app abre em `http://localhost:5173`.

Sem o arquivo `.env`, o app não quebra em branco: ele mostra um aviso
dizendo o que falta.

---

## Onde está cada requisito do projeto

| Requisito | Onde ver |
|---|---|
| Componente reutilizado com props | `src/components/Barra.jsx`, usado 3× em `Resultados.jsx` |
| Formulário controlado com `useState` | `src/components/Formulario.jsx` |
| `onSubmit` com `preventDefault()` | `Formulario.jsx`, função `handleSubmit` |
| `async/await` e erro tratado | `Formulario.jsx` (insert) e `Resultados.jsx` (select) |
| Os três estados da requisição | `Formulario.jsx`, estado `status` |
| `useEffect` carregando ao abrir | `src/components/Resultados.jsx` |
| `.map()` com `key` | `Resultados.jsx`, `Sobre.jsx` e `Cabecalho.jsx` |
| Condicional trocando a tela | `src/App.jsx` |
| CSS Modules | todos os `*.module.css` |
| Variáveis de ambiente | `src/lib/supabase.js` |
| Políticas de RLS | `supabase/schema.sql` |

---

## Três detalhes que costumam pegar

**1. No Vite, o arquivo é `.jsx`, não `.js`.**
Diferente do Create React App, o Vite só transforma JSX em arquivos com
extensão `.jsx`. Um componente salvo como `.js` quebra o build.

**2. O Supabase não lança exceção.**
Ele devolve `{ data, error }`. Quem lê só o `data` acha que gravou e não
gravou. Toda chamada neste projeto confere o `error` antes de seguir.

**3. A *publishable key* é pública.**
Ela vai junto com o app para o navegador — e tudo bem. O próprio painel
do Supabase diz que ela é segura de usar no navegador *desde que a RLS
esteja ligada*. Quem protege os dados são as políticas do `schema.sql`.
Sem elas, qualquer pessoa apaga a sua tabela pelo console.

> Tutoriais antigos chamam essa chave de **anon key**. O Supabase
> renomeou para **publishable** (`sb_publishable_…`); a antiga sai de
> circulação. É a mesma função.

---

## Publicar no Netlify

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variables | `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` |

O passo a passo completo, com telas, está no roteiro entregue em aula.

---

## Créditos

Design system **Kage**. Dados históricos: Agência Brasil, *Entidades
japonesas comemoram 112 anos de imigração ao Brasil* (2020), com
estimativas da Sociedade Brasileira de Cultura Japonesa e de Assistência
Social (Bunkyo).
