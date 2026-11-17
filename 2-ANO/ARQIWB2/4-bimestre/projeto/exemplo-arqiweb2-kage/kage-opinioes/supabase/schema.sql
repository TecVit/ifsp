-- =========================================================================
-- ARQIWEB2 — script da tabela de opiniões
-- Cole TUDO isto no SQL Editor do Supabase e clique em RUN.
-- =========================================================================

-- 1) A tabela. Uma linha por resposta.
create table opinioes (
  id          bigint generated always as identity primary key,
  tema        text not null,
  resposta_1  text not null,
  resposta_2  int  not null check (resposta_2 between 1 and 5),
  resposta_3  text,
  criado_em   timestamptz not null default now()
);

-- 2) A trava. Sem esta linha a tabela fica aberta para o mundo inteiro:
--    qualquer pessoa com a publishable key (que é pública!) poderia ler,
--    alterar e APAGAR tudo pelo console do navegador.
alter table opinioes enable row level security;

-- 3) O que fica liberado. Com a RLS ligada, a lógica se inverte:
--    tudo é negado, e só o que ganha política passa a ser permitido.
--
--    As políticas abaixo não trazem a cláusula "to <papel>", então valem
--    para qualquer chamador. É o que queremos aqui: o formulário é
--    anônimo e os resultados são públicos.

create policy "qualquer um pode responder"
  on opinioes for insert with check (true);

create policy "qualquer um pode ver os resultados"
  on opinioes for select using (true);

-- 4) Repare no que NÃO está aqui: não existe política de update nem de
--    delete. Por isso ninguém consegue alterar nem apagar as respostas,
--    mesmo tendo a chave em mãos. É esse o teste do dia da entrega.
