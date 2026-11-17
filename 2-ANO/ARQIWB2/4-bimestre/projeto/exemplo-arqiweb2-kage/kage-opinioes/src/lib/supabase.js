import { createClient } from '@supabase/supabase-js';

/* =========================================================================
   CONEXÃO COM O SUPABASE

   As duas chaves vêm do arquivo .env, que fica na raiz do projeto.
   No Vite, só as variáveis que começam com VITE_ chegam até o código
   que roda no navegador — por isso o prefixo não é enfeite.

   SOBRE O NOME DA CHAVE
   O Supabase trocou o nome das chaves. A que usamos aqui aparece no
   painel como "Publishable key" e começa com sb_publishable_.
   Em tutoriais e vídeos mais antigos ela se chama "anon key" — é a
   mesma coisa, com nome novo. A outra, "Secret key" (sb_secret_),
   ignora todas as políticas de segurança e NUNCA entra em código de
   front-end.

   ATENÇÃO, e isto vale a nota do bimestre: a publishable key É PÚBLICA.
   Ela vai junto com o app para o navegador de quem abrir o site, e
   qualquer pessoa consegue lê-la no DevTools em trinta segundos.
   Isso não é um erro — é o desenho da ferramenta. O próprio painel diz
   que ela é segura de usar no navegador *desde que a RLS esteja ligada*.
   Quem protege os dados são as políticas, criadas no banco
   (veja supabase/schema.sql).
   ========================================================================= */

const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Serve para o app avisar na tela, em vez de quebrar em branco,
// quando alguém roda o projeto sem ter criado o .env.
export const configurado = Boolean(url && chave);

export const supabase = configurado ? createClient(url, chave) : null;

// Identifica as respostas deste projeto dentro da tabela.
// Cada dupla troca por 'economia-solidaria', 'clima' ou 'ia'.
export const TEMA = 'cultura-japonesa';
