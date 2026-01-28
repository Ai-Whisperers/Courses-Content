Crea herramienta de selección de sistema propulsivo:

OBJETIVO:
Programa interactivo que recomiende motor/batería óptimo según misión.

INPUTS DEL USUARIO:

1. Peso total UAV (kg)
2. Autonomía requerida (min)
3. Velocidad crucero (m/s)
4. Presupuesto (USD)
5. Aplicación (agricultura, delivery, recreativo, etc.)
6. Limitación ruido (sí/no)

LÓGICA DEL PROGRAMA:

1. Calcular requerimientos:
   - Empuje necesario (T/W ratio)
   - Energía necesaria (potencia × tiempo)
   - Restricciones específicas app

2. Base de datos motores:
   - 10+ modelos eléctricos comunes
   - 5+ motores pistón
   - Incluir specs: KV, peso, potencia, precio

3. Base de datos baterías:
   - Rangos: 2S-6S, 1000-20000 mAh
   - Pesos, precios, C-ratings

OUTPUT:

- Top 3 combinaciones recomendadas
- Justificación técnica
- Link a tienda o proveedor

TODO en español
