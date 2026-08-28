create table categorias {
    id uuid default gen_random_uuid() primary key,
    nome text not null,
    tipo text not null -- 'receita' ou 'despesa'
};

create table transacoes (
    id uuid default gen_random_uuid() primary key,
    descricao text not null,
    valor numeric not null,
    tipo text not null,
    data timestamp with time zone default now()
    categoria_id uuid references categorias(id),
    user_id uuid default auth.uid() not null
),

insert into categorias (nome,tipo) values ('alimentação','despesa'),('transporte', 'despesa')
('lazer','despesa'),
('salario','receita'), ('freelance', 'receita')

alter table categorias enable row level security;
create policy "leitura pública de categorias" on categorias for select to authenticated using (true);

alter table transacoes enable row level security;
create policy "usuarios gerenciam suas proprias dados" on transacoes
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "permitir atualizando para usuarios autenticados" on transacoes for update
to authenticated using (auth.uid() = user_id) with check (auth_uid() = user_id);

create policy "permitir exclusão para usuarios autenticados" on transacoes for delete to 
authenticated using (auth.uid() = user_id);