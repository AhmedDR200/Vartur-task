.PHONY: install build start dev docker-build docker-up docker-down docker-logs clean

# Development commands
install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

# Prisma commands
prisma-generate:
	npm run prisma:generate

prisma-migrate:
	npm run prisma:migrate

# Docker commands
docker-build:
	docker compose build

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

# Clean commands
clean:
	rm -rf node_modules dist generated

# Combined commands
setup: install prisma-generate build

docker-start: docker-build docker-up

# Help command
help:
	@echo "Available commands:"
	@echo "  make install        - Install dependencies"
	@echo "  make build         - Build the project"
	@echo "  make start         - Start the production server"
	@echo "  make dev           - Start the development server"
	@echo "  make prisma-generate - Generate Prisma client"
	@echo "  make prisma-migrate  - Run Prisma migrations"
	@echo "  make docker-build   - Build Docker containers"
	@echo "  make docker-up      - Start Docker containers"
	@echo "  make docker-down    - Stop Docker containers"
	@echo "  make docker-logs    - View Docker container logs"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make setup          - Full project setup"
	@echo "  make docker-start   - Build and start Docker containers" 