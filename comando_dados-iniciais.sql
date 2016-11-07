﻿INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111205,'PRESIDENTE DA REPÚBLICA');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111210,'VICE-PRESIDENTE DA REPÚBLICA');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111215,'MINISTRO DE ESTADO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111220,'SECRETÁRIO - EXECUTIVO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111225,'MEMBRO SUPERIOR DO PODER EXECUTIVO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111230,'GOVERNADOR DE ESTADO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111235,'GOVERNADOR DO DISTRITO FEDERAL');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111240,'VICE-GOVERNADOR DE ESTADO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111245,'VICE-GOVERNADOR DO DISTRITO FEDERAL');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111250,'PREFEITO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (111255,'VICE-PREFEITO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (223104,'MÉDICO ANESTESIOLOGISTA  ANESTESIOLOGISTA');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (251605,'ASSISTENTE SOCIAL');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (223405,'FARMACÊUTICO BOTICÁRIO COSMETÓLOGO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (223110,'MÉDICO CIRURGIÃO GERAL');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (223115,'MÉDICO CLÍNICO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (2235,'OUTROS ENFERMEIROS');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (223510,'ENFERMEIRO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (252210,'CONTADOR');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (622010,'JARDINEIRO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (517330,'VIGILANTE');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (715210,'PEDREIRO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (123605,'DIRETOR DE SERVIÇOS DE INFORMATICA');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (142515,'GERENTE DE PRODUCAO DE TECNOLOGIA DA INFORMAÇÃO');
INSERT INTO CLASSIFICACAO_BRASILEIRA_OCUPACAO(CODIGO_CBO,NOME) VALUES (317110,'PROGRAMADOR DE SISTEMAS DE INFORMAÇÃO');

INSERT INTO PAIS(NOME,SIGLA) VALUES ('BRASIL','BRA');
INSERT INTO ESTADO(NOME,SIGLA,I_PAIS) VALUES ('SANTA CATARINA','SC',1);
INSERT INTO MUNICIPIO(CODIGO_IBGE,NOME,I_ESTADO) VALUES (420460,'CRICIÚMA',1);

INSERT INTO CLASSIFICACAO_INTERNACIONAL_DOENCA(CODIGO_CID,DESCRICAO) VALUES ('B26','CAXUMBA');
INSERT INTO CLASSIFICACAO_INTERNACIONAL_DOENCA(CODIGO_CID,DESCRICAO) VALUES ('G43','ENXAQUECA');
INSERT INTO CLASSIFICACAO_INTERNACIONAL_DOENCA(CODIGO_CID,DESCRICAO) VALUES ('A92.0','FEBRE DE CHIKUNGUNYA');
INSERT INTO CLASSIFICACAO_INTERNACIONAL_DOENCA(CODIGO_CID,DESCRICAO) VALUES ('H40','GLAUCOMA');

INSERT INTO UNIDADE_BASICA_SAUDE_TIPO_ESTABELECIMENTO(DESCRICAO,NOME) VALUES ('Unidade destinada à prestação de assistência a uma determinada população, de forma programada ou não, por profissional de nível médio, com a presença intermitente ou não do profissional médico. ','Posto de Saúde');
INSERT INTO UNIDADE_BASICA_SAUDE_TIPO_ESTABELECIMENTO(DESCRICAO,NOME) VALUES ('Unidade para realização de atendimentos de atenção básica e integral a uma população, de forma programada ou não, nas especialidades básicas, podendo oferecer assistência odontológica e de outros profissionais de nível superior. A assistência deve ser permanente e prestada por médico generalista ou especialista nestas áreas. Podendo ou não oferecer: SADT e Pronto atendimento 24 Horas. ','Centro de Saúde/Unidade Básica de Saúde');

INSERT INTO UNIDADE_BASICA_SAUDE (ATIVO,BAIRRO,CEP,CNPJ,CODIGO_CNES,COMPLEMENTO,EMAIL,ESFERA_ADMINISTRATIVA,LOGRADOURO,NOME,NUMERO,PONTO_REFERENCIA,
SEM_NUMERO,TELEFONE_FAX,TELEFONE_PRINCIPAL,TELEFONE_SECUNDARIO,I_MUNICIPIO,I_UNIDADE_BASICA_SAUDE_TIPO_ESTABELECIMENTO) VALUES 
(b'1','BAIRRO','88888888',NULL,123456,'COMPLEMENTO','unidade@sisape.com.br','PUBLICO_FEDERAL','LOGRADOURO','UNIDADE DO CENTRO',123,'REFERENCIA',b'0',NULL,NULL,NULL,1,1);

INSERT INTO UNIDADE_BASICA_SAUDE_PARAMETRO (COMPLEXIDADE_ALTA,COMPLEXIDADE_ATENCAO_BASICA,COMPLEXIDADE_MEDIA,DURACAO_PADRAO_ATENDIMENTO,
HORARIO_MATUTINO,HORARIO_MATUTINO_FIM,HORARIO_MATUTINO_INICIO,HORARIO_NOTURNO,HORARIO_NOTURNO_FIM,HORARIO_NOTURNO_INICIO,HORARIO_VESPERTINO,HORARIO_VESPERTINO_FIM,
HORARIO_VESPERTINO_INICIO,TIPO_SERVICO_ADM,TIPO_SERVICO_CURATIVO,TIPO_SERVICO_DEMANDA,TIPO_SERVICO_ESCUTA,TIPO_SERVICO_EXAME,TIPO_SERVICO_NEBULIZACAO,TIPO_SERVICO_ODONTOLOGIA,TIPO_SERVICO_PROCEDIMENTO,
TIPO_SERVICO_VACINA,I_UNIDADE_BASICA_SAUDE) VALUES (B'1',B'1',B'1',30,B'0',0,0,B'0',0,0,B'0',0,0,B'1',B'1',B'1',B'1',B'1',B'1',B'1',B'1',B'1',1);

INSERT INTO UNIDADE_BASICA_SAUDE_ZONA_ATENDIMENTO (DESCRICAO,I_UNIDADE_BASICA_SAUDE) VALUES ('REGIÃO CENTRAL',1);

INSERT INTO TIPO_LOGRADOURO(CODIGO_ESUS, DESCRICAO) VALUES (1,'ACESSO');