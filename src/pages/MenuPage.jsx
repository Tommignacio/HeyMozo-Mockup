import { Card } from '@heroui/react';
import Phone from '../components/Phone';
import ClienteHeader from '../components/ClienteHeader';
import { menuCategories } from '../data/menuItems';

export default function MenuPage() {
  return (
    <Phone>
      <div className="phone-cliente flex h-full min-h-0 w-full flex-col bg-white">
        <ClienteHeader showBack />
        <div className="menu-content min-h-0 flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1c1c1e', marginBottom: 20 }}>
            Menú
          </h2>
          {menuCategories.map((section) => (
            <section key={section.category} style={{ marginBottom: 28 }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#e8362a',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {section.category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {section.items.map((item) => (
                  <Card key={item.title} className="w-full" variant="default">
                    <div style={{ display: 'flex', overflow: 'hidden', borderRadius: 12 }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, padding: 12, minWidth: 0 }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1c1c1e', marginBottom: 4 }}>
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontSize: 13,
                            color: '#6b7280',
                            marginBottom: 6,
                            lineHeight: 1.4,
                          }}
                        >
                          {item.description}
                        </p>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#e8362a' }}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Phone>
  );
}
