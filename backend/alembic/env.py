from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
import sys

# Добавляем корень проекта в sys.path, чтобы видеть database.py и models.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Импорт моделей и базы
from database import Base
from models import *
from dotenv import load_dotenv

# Загружаем переменные окружения из .env
load_dotenv()

# Получаем конфиг Alembic
config = context.config

# Устанавливаем URL базы данных
config.set_main_option('sqlalchemy.url', os.getenv("SQLALCHEMY_DATABASE_URL"))

# Настройка логирования
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Устанавливаем target_metadata для Alembic
target_metadata = Base.metadata
