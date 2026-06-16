import matplotlib.pyplot as plt

# Data (in Million KMs) - Source: Ministry of Road Transport/Global Data
countries = ['USA', 'INDIA', 'CHINA', 'BRAZIL']
network = [6.8, 6.6, 5.4, 2.0]
colors = ['#ced4da', '#28a745', '#dc3545', '#ced4da'] # Gray, Green (Hero), Red, Gray

plt.figure(figsize=(10, 6), facecolor='white')
bars = plt.bar(countries, network, color=colors, width=0.6)

# Add values on top
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, yval + 0.1, f"{yval}M km", 
             ha='center', va='bottom', fontsize=14, fontweight='bold')

# Highlight India
plt.text(1, 3, "Rank #2\n(Overtook China)", ha='center', color='white', fontweight='bold', fontsize=12)

# Styling
plt.title("World's Largest Road Networks (2025)", fontsize=16, fontweight='bold', pad=20)
plt.ylabel("Road Length (Million km)", fontsize=12)
ax = plt.gca()
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
ax.get_yaxis().set_visible(False) # Clean look

plt.tight_layout()
plt.show()