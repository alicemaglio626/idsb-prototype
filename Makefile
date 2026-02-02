.PHONY: login install dev build

login:
	@aws sts get-caller-identity --query "Account" --profile dev 2>/dev/null 1>/dev/null || aws sso login --profile dev
	aws codeartifact login --tool npm --repository npm --domain datavant --domain-owner 283241578630 --region us-east-1 --profile prod

install: login
	npm install --strict-ssl=false

dev:
	npm run dev

build:
	npm run build
