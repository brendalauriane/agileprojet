# SmartBacklog AI+

Assistant intelligent pour la gestion Agile de projets.  
Permet de créer des tickets, gérer un tableau Kanban, et analyser automatiquement les tickets via IA.

---

## Fonctionnalités
- Créer / Modifier / Supprimer des tickets (CRUD complet)
- Tableau Kanban interactif (To Do, In Progress, Done)
- Analyse IA : critères d’acceptation, story points, priorité

---

## Stack technique
- Frontend : HTML, JS, CSS
- Backend : Python + FastAPI
- IA : OpenAI GPT-4o-mini
- Base de données : en mémoire (MVP)

---

## Installation
1. Cloner le dépôt
2. Créer un environnement virtuel Python
3. Installer les dépendances : `pip install -r requirements.txt`
4. Lancer le serveur : `uvicorn backend.app:app --reload`

---

## Exemple d’utilisation
- Créer un ticket via le formulaire
- Cliquer sur “IA” pour générer les critères d’acceptation, story points et priorité

---

## Sprints
- **Sprint 1** : Core System (CRUD tickets + Kanban simple)
- **Sprint 2** : IA Assistant (analyse automatique des tickets)
- **Sprint 3** : Optimisation UX et priorités visuelles