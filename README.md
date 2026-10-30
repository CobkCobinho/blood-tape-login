# BLOOD//TAPE 📼

Um formulário de login com alma analógica: vermelho sangue, preto, vidro fosco e estética VHS dos anos 2000. Feito com **HTML, CSS e JavaScript puro**, sem instalação de pacotes ou etapa de compilação.

## Acesse o projeto

- **Site funcionando:** [cobkcobinho.github.io/blood-tape-login](https://cobkcobinho.github.io/blood-tape-login/)
- **Código-fonte:** [github.com/CobkCobinho/blood-tape-login](https://github.com/CobkCobinho/blood-tape-login)

O endereço `github.io` abre a demonstração publicada pelo GitHub Pages. O endereço `github.com` abre o repositório com os arquivos, a documentação e o histórico de alterações.

> Projeto educacional de frontend. Login e cadastro são simulações: nenhuma conta é criada e nenhuma sessão é autenticada.

## Como abrir localmente

Baixe os arquivos e abra `index.html` no navegador. Mantenha `styles.css`, `script.js` e `icon.svg` na mesma pasta.

Para servir localmente, se você já tem Python instalado, execute na pasta do projeto:

```sh
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

As fontes vêm do Google Fonts e precisam de internet. Sem conexão, o projeto usa fontes alternativas do sistema. A fita VHS, o fundo e os ícones são desenhados em CSS/SVG, sem imagens externas.

## Funcionalidades

- Login e cadastro demonstrativos na mesma tela.
- Campos com rótulos, autocomplete e erros associados para leitores de tela.
- Mostrar/ocultar senha, sem bloquear colar ou usar gerenciadores de senhas.
- Botão com três cores e texto personalizável de até 24 caracteres.
- Opção de lembrar apenas o e-mail, marcada pelo visitante.
- Scanlines, fita animada e efeito de desfoque no painel e na área de registro.
- Controle para desligar os efeitos; respeita a preferência de movimento reduzido do sistema.
- Layout centralizado e responsivo, com foco visível e navegação por teclado.

## Regras de negócio da demonstração

| Regra | Comportamento |
| --- | --- |
| E-mail | Obrigatório, até 254 caracteres; espaços nas extremidades são removidos; validação usa o campo HTML `email`. |
| Senha | Obrigatória, de 8 a 128 caracteres; não pode conter apenas espaços. A senha não é aparada ou transformada. |
| Cadastro | Exige também nome com pelo menos 2 caracteres após remover espaços nas extremidades, até 60 caracteres no campo. |
| Campos inválidos | O envio é interrompido, os erros aparecem nos campos e o foco vai para o primeiro erro. |
| Envio | Evita envios simultâneos; mostra uma espera simulada de 800 ms. |
| Resultado | Informa que os campos passaram pela validação. Não afirma que uma sessão ou conta foi criada. |
| Senha após envio | É apagada do campo e volta ao modo oculto. Não é enviada, registrada em logs ou armazenada. |
| Lembrar e-mail | Apenas o e-mail é salvo em `localStorage`, depois de uma submissão válida com a opção marcada. Desmarcar remove o valor salvo. |
| Troca de formulário | Cancela a espera em andamento, limpa a senha e os erros e ajusta foco e autocomplete. |
| Recuperação | Explica a limitação da demo; nenhum e-mail é enviado. |
| Dados inseridos | São tratados como texto; nenhum conteúdo digitado é interpretado como HTML. |

**Este projeto é uma interface educacional. Não autentica usuários, não verifica credenciais e não cria contas.** O armazenamento local pode ser bloqueado pelo navegador; nesse caso, o formulário continua funcionando sem lembrar o e-mail. Em arquivos `file://`, o comportamento de `localStorage` varia entre navegadores.

## Organização

```text
blood-tape/
├── index.html    # Estrutura semântica e formulários
├── styles.css    # Paleta, fita VHS, layout e efeitos responsivos
├── script.js     # Validação, estados e personalização
├── icon.svg      # Símbolo original: fita VHS com detalhe sangue
├── .gitignore   # Arquivos locais que não devem entrar no Git
├── .nojekyll    # Publicação estática no GitHub Pages
├── LICENSE      # Licença MIT
└── README.md    # Documentação do projeto
```

## Títulos H1 a H6

Todos têm estilos definidos no CSS e aparecem na página, como exercício solicitado:

- **H1:** chamada principal do projeto.
- **H2:** título do formulário, atualizado ao alternar para cadastro.
- **H3:** seção de personalização.
- **H4, H5 e H6:** legendas das três opções de personalização.

Os três últimos são uma escolha didática para demonstrar todas as tags. Em um produto real, controles irmãos normalmente usam títulos no mesmo nível. O tamanho visual é definido no CSS e não depende do tamanho padrão das tags.

## Para evoluir para autenticação real

Conecte a interface a um backend ou provedor de identidade. Validação no navegador ajuda a experiência de uso; as mesmas regras precisam ser verificadas no servidor. O serviço deverá cuidar de hash seguro de senhas, sessões, proteção contra abuso e recuperação por tokens de uso único. Nunca transforme `localStorage` em banco de senhas.

## Verificação

A revisão incluiu checagem de sintaxe do JavaScript com `node --check`, um teste isolado de eventos e estado e testes na demonstração publicada em um navegador real.

No navegador, foram conferidos:

- Mensagens para campos vazios, e-mail inválido e senha curta.
- Envio válido de login e cadastro, com o aviso de simulação.
- Mostrar e ocultar senha.
- E-mail mantido após recarregar com a opção de lembrança selecionada.
- Alternância entre login e cadastro.
- Cor e texto do botão e controle do efeito VHS.
- Navegação por Tab entre os campos e aviso de recuperação de senha.
- Aparência no computador e em larguras de tela de 390 px e 320 px.

A revisão identificou e corrigiu o tamanho do título e a rolagem horizontal em telas estreitas. Também foi atualizada a versão do CSS no HTML para carregar os estilos corrigidos.

Os testes de largura foram feitos no navegador de computador, sem uso de um celular físico. Essa revisão não cobre todos os navegadores ou uma autenticação de produção.
