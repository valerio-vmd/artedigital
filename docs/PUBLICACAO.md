# Publicação na HostGator

## Arquivos para enviar

Envie `index.html` e a pasta `assets` para a raiz de documentos do domínio, preservando os nomes e as subpastas. No domínio principal, essa pasta normalmente é `public_html`; confira a raiz indicada no seu cPanel para o domínio escolhido. Para um subdomínio ou domínio adicional, use a raiz de documentos correspondente.

Não é necessário enviar `node_modules`, `scripts`, `docs`, `package.json`, `package-lock.json`, `tailwind.config.cjs` ou este README. Não é preciso executar npm no servidor. Os arquivos `assets/css/tailwind.input.css` também podem ficar apenas no ambiente local.

## Passo a passo

1. Guarde uma cópia dos arquivos já existentes na raiz do domínio antes de substituir a página.
2. No Gerenciador de Arquivos do cPanel ou via FTP, envie `index.html` e `assets` para a pasta correta.
3. Se houver uma página inicial antiga, como `index.php`, confirme qual arquivo deve atender o domínio e remova ou renomeie a versão antiga somente após guardar a cópia.
4. Ative o certificado SSL e o redirecionamento HTTPS no painel, conforme as opções disponíveis na sua conta.
5. Abra o domínio por HTTPS e confira o carregamento dos estilos, ícones, navegação e formulário no celular.
6. Teste o contato pelo navegador do Instagram. Confirme serviços, prazo, acentos e quebras de linha na mensagem do WhatsApp.
7. Adicione o endereço HTTPS à bio do Instagram.

## Antes de divulgar

- Confirme o número em `assets/js/config.js`. Os endereços no HTML também mantêm o número original como alternativa sem JavaScript; ao trocar de número, atualize ambos.
- Substitua as ilustrações e os projetos demonstrativos por conteúdo real.
- Confirme nome da marca, serviços e disponibilidade.
- Depois de qualquer alteração nas classes Tailwind, execute `npm run build:css` localmente e envie o CSS atualizado.
- Evite publicar arquivos de configuração com credenciais ou backups do projeto.

A publicação depende do acesso à sua hospedagem e não foi realizada por este projeto.
