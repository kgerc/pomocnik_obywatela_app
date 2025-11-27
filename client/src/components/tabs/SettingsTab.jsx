import React, { useState } from 'react';
import {
  User, Shield, Lock, Loader, Trash2,
  Save, Mail, Key, CreditCard,
  HelpCircle, Crown, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../hooks/useSettings';
import { useSubscription } from '../../hooks/useSubscription';
import { useToast } from '../../contexts/ToastContext';

const SettingsTab = () => {
  const { user } = useAuth();
  const { settings, loading, updateSettings, updateProfile, changePassword, toggle2FA, exportData, deleteAccount } = useSettings();
  const { subscription, isPremium, createPortalSession } = useSubscription();
  const { showSuccess, showError, confirm } = useToast();

  const [activeSection, setActiveSection] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    theme: 'light',
    emailNotifications: true,
    smsNotifications: false,
    notificationTypes: {},
    gdprConsents: {},
    twoFactorEnabled: false
  });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const sections = [
    { id: 'personal', icon: User, label: 'Dane osobowe' },
    { id: 'security', icon: Shield, label: 'Bezpieczeństwo' },
    { id: 'privacy', icon: Lock, label: 'Prywatność' },
    { id: 'subscription', icon: CreditCard, label: 'Subskrypcja' },
    { id: 'help', icon: HelpCircle, label: 'Pomoc' }
  ];

  React.useEffect(() => {
    if (settings) {
      setFormData({
        fullName: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        theme: settings.theme || 'light',
        emailNotifications: settings.emailNotifications ?? true,
        smsNotifications: settings.smsNotifications ?? false,
        notificationTypes: settings.notificationTypes || {},
        gdprConsents: settings.gdprConsents || {},
        twoFactorEnabled: settings.twoFactorEnabled || false
      });
    }
  }, [settings, user]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        fullName: formData.fullName
      });
      setEditMode(false);
      showSuccess('Dane zostały zaktualizowane');
    } catch (error) {
      showError('Błąd podczas zapisywania danych');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      showError('Nowe hasła nie są identyczne');
      return;
    }

    if (passwordData.new.length < 6) {
      showError('Hasło musi mieć minimum 6 znaków');
      return;
    }

    try {
      await changePassword(passwordData.current, passwordData.new);
      setPasswordData({ current: '', new: '', confirm: '' });
      showSuccess('Hasło zostało zmienione');
    } catch (error) {
      showError(error.message || 'Błąd podczas zmiany hasła');
    }
  };

  const handleToggleTheme = async () => {
    const newTheme = formData.theme === 'light' ? 'dark' : 'light';
    try {
      await updateSettings({ theme: newTheme });
      setFormData({ ...formData, theme: newTheme });
      showSuccess('Motyw został zmieniony');
    } catch (error) {
      showError('Błąd podczas zmiany motywu');
    }
  };

  const handleUpdateNotifications = async () => {
    try {
      await updateSettings({
        emailNotifications: formData.emailNotifications,
        smsNotifications: formData.smsNotifications,
        notificationTypes: formData.notificationTypes
      });
      showSuccess('Ustawienia powiadomień zostały zaktualizowane');
    } catch (error) {
      showError('Błąd podczas zapisywania ustawień');
    }
  };

  const handleUpdateGDPR = async () => {
    try {
      await updateSettings({
        gdprConsents: formData.gdprConsents
      });
      showSuccess('Zgody zostały zaktualizowane');
    } catch (error) {
      showError('Błąd podczas zapisywania zgód');
    }
  };

  const handleExportData = async (format) => {
    try {
      await exportData(format);
      showSuccess(`Dane zostały wyeksportowane do ${format.toUpperCase()}`);
    } catch (error) {
      showError('Błąd podczas eksportu danych');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = await confirm(
      'Czy na pewno chcesz usunąć swoje konto? Tej operacji nie można cofnąć.',
      'Usuń',
      'Anuluj'
    );
    if (confirmed) {
      try {
        await deleteAccount(confirmed);
        showSuccess('Konto zostało usunięte. Przekierowanie...');
        setTimeout(() => window.location.href = '/', 2000);
      } catch (error) {
        showError('Błąd podczas usuwania konta');
      }
    }
  };

  if (loading && !settings) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center'
      }}>
         <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
        <p style={{ color: '#5a6c7d' }}>Ładowanie ustawień...</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalDataSection
            formData={formData}
            setFormData={setFormData}
            editMode={editMode}
            setEditMode={setEditMode}
            handleSave={handleSaveProfile}
            loading={loading}
          />
        );

      case 'security':
        return (
          <SecuritySection
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            handleChangePassword={handleChangePassword}
            twoFactorEnabled={formData.twoFactorEnabled}
            toggle2FA={toggle2FA}
            showSuccess={showSuccess}
            showError={showError}
            loading={loading}
          />
        );

      case 'privacy':
        return (
          <PrivacySection
            formData={formData}
            setFormData={setFormData}
            handleUpdateGDPR={handleUpdateGDPR}
            handleExportData={handleExportData}
            handleDeleteAccount={handleDeleteAccount}
            loading={loading}
          />
        );

      case 'subscription':
        return (
          <SubscriptionSection
            subscription={subscription}
            isPremium={isPremium}
            createPortalSession={createPortalSession}
          />
        );

      case 'help':
        return <HelpSection />;

      default:
        return null;
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: '30px'
      }}>
        Ustawienia
      </h2>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: activeSection === section.id ? '#e8f4f8' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                marginBottom: '8px',
                cursor: 'pointer',
                color: activeSection === section.id ? '#2c5aa0' : '#5a6c7d',
                fontWeight: activeSection === section.id ? '600' : '500',
                fontSize: '15px',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = '#f8f9fb';
                }
              }}
              onMouseOut={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <section.icon size={20} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

// Sub-components for each section
const PersonalDataSection = ({ formData, setFormData, editMode, setEditMode, handleSave, loading }) => (
  <div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', margin: 0 }}>
        Dane osobowe
      </h3>
      <div style={{ minWidth: '188px', display: 'flex', justifyContent: 'flex-end' }}>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            style={{
              padding: '8px 16px',
              background: '#2c5aa0',
              color: 'white',
              border: '2px solid transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Edytuj
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setEditMode(false)}
              disabled={loading}
              style={{
                padding: '8px 16px',
                background: '#f8f9fb',
                color: '#5a6c7d',
                border: '2px solid #e1e8ed',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                opacity: loading ? 0.6 : 1
              }}
            >
              Anuluj
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                padding: '8px 16px',
                background: loading ? '#ccc' : '#10b981',
                color: 'white',
                border: '2px solid transparent',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save size={16} />
              {loading ? 'Zapisywanie...' : 'Zapisz'}
            </button>
          </div>
        )}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField
        label="Imię i nazwisko"
        icon={User}
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        disabled={!editMode}
      />

      <FormField
        label="Adres e-mail"
        icon={Mail}
        value={formData.email}
        disabled={true}
        hint="Email nie może być zmieniony"
      />
    </div>
  </div>
);

const SecuritySection = ({ passwordData, setPasswordData, handleChangePassword, twoFactorEnabled, toggle2FA, showSuccess, showError, loading }) => (
  <div>
    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginBottom: '20px' }}>
      Bezpieczeństwo
    </h3>

    {/* Zmiana hasła */}
    <div style={{
      background: '#f8f9fb',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2c3e50', marginBottom: '16px' }}>
        Zmiana hasła
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField
          label="Obecne hasło"
          icon={Key}
          type="password"
          value={passwordData.current}
          onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
          disabled={loading}
        />

        <FormField
          label="Nowe hasło"
          icon={Key}
          type="password"
          value={passwordData.new}
          onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
          disabled={loading}
        />

        <FormField
          label="Potwierdź nowe hasło"
          icon={Key}
          type="password"
          value={passwordData.confirm}
          onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
          disabled={loading}
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#ccc' : '#2c5aa0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '15px',
            alignSelf: 'flex-start'
          }}
        >
          {loading ? 'Zmiana hasła...' : 'Zmień hasło'}
        </button>
      </div>
    </div>
  </div>
);

const PrivacySection = ({ formData, setFormData, handleUpdateGDPR, handleExportData, handleDeleteAccount, loading }) => (
  <div>
    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginBottom: '20px' }}>
      Prywatność i RODO
    </h3>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* GDPR Consents */}
      <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2c3e50', marginBottom: '16px' }}>
          Zgody RODO
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <CheckboxField
            label="Zgoda na przetwarzanie danych osobowych"
            checked={formData.gdprConsents?.dataProcessing ?? true}
            onChange={(checked) => setFormData({
              ...formData,
              gdprConsents: { ...formData.gdprConsents, dataProcessing: checked }
            })}
            hint="Wymagane do korzystania z aplikacji"
            disabled={loading}
          />

          <CheckboxField
            label="Zgoda na marketing"
            checked={formData.gdprConsents?.marketing ?? false}
            onChange={(checked) => setFormData({
              ...formData,
              gdprConsents: { ...formData.gdprConsents, marketing: checked }
            })}
            disabled={loading}
          />

          <CheckboxField
            label="Zgoda na otrzymywanie newslettera"
            checked={formData.gdprConsents?.newsletter ?? false}
            onChange={(checked) => setFormData({
              ...formData,
              gdprConsents: { ...formData.gdprConsents, newsletter: checked }
            })}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleUpdateGDPR}
          disabled={loading}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            background: loading ? '#ccc' : '#2c5aa0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          {loading ? 'Zapisywanie...' : 'Zapisz zgody'}
        </button>
      </div>

      {/* Delete Account */}
      <div style={{
        background: '#fee',
        border: '2px solid #fcc',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#c33', marginBottom: '12px' }}>
          Usuń konto
        </h4>

        <p style={{ color: '#5a6c7d', fontSize: '14px', marginBottom: '16px' }}>
          Nieodwracalna operacja. Wszystkie Twoje dane zostaną trwale usunięte.
        </p>

        <button
          onClick={handleDeleteAccount}
          style={{
            padding: '10px 20px',
            background: '#c33',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Trash2 size={16} />
          Usuń konto
        </button>
      </div>
    </div>
  </div>
);

const SubscriptionSection = ({ subscription, isPremium, createPortalSession }) => (
  <div>
    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginBottom: '20px' }}>
      Subskrypcja i płatności
    </h3>

    {isPremium ? (
      <div style={{
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        padding: '24px',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Crown size={28} color="#ffd700" />
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
              Plan Premium
            </h4>
            <p style={{ fontSize: '14px', margin: '4px 0 0 0', opacity: 0.9 }}>
              Aktywny do: {new Date(subscription.currentPeriodEnd).toLocaleDateString('pl-PL')}
            </p>
          </div>
        </div>

        <button
          onClick={createPortalSession}
          style={{
            padding: '12px 24px',
            background: 'white',
            color: '#2c5aa0',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CreditCard size={18} />
          Zarządzaj subskrypcją
          <ExternalLink size={16} />
        </button>
      </div>
    ) : (
      <div style={{
        background: '#f8f9fb',
        padding: '24px',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#2c3e50', marginBottom: '12px' }}>
          Plan Darmowy
        </h4>

        <p style={{ color: '#5a6c7d', fontSize: '14px', marginBottom: '20px' }}>
          Przejdź na Premium, aby odblokować wszystkie funkcje
        </p>

        <p style={{ fontSize: '32px', fontWeight: '800', color: '#2c5aa0', marginBottom: '8px' }}>
          39,99 zł/msc
        </p>

        <p style={{ color: '#5a6c7d', fontSize: '14px', marginBottom: '20px' }}>
          Kliknij na premium zakładkę aby przejść na wyższy plan
        </p>
      </div>
    )}
  </div>
);

const HelpSection = () => (
  <div>
    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginBottom: '20px' }}>
      Pomoc i wsparcie
    </h3>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2c3e50', marginBottom: '12px' }}>
          Kontakt
        </h4>

        <p style={{ color: '#5a6c7d', fontSize: '14px', marginBottom: '16px' }}>
          Masz pytania lub potrzebujesz pomocy? Skontaktuj się z nami:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ color: '#2c3e50', fontSize: '14px', margin: 0 }}>
            <strong>Email:</strong> kontakt@pomocnikobywatela.pl
          </p>
        </div>
      </div>

      <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2c3e50', marginBottom: '12px' }}>
          FAQ i dokumentacja
        </h4>

        <p style={{ color: '#5a6c7d', fontSize: '14px' }}>
          Odwiedź naszą bazę wiedzy (sekcja FAQ): <a href="https://pomocnikobywatela.pl/#faq" target="_blank" rel="noopener noreferrer" style={{ color: '#2c5aa0', fontWeight: '600' }}>Centrum pomocy</a>
        </p>
      </div>

      <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2c3e50', marginBottom: '12px' }}>
          Zgłoś błąd lub sugestię
        </h4>

        <p style={{ color: '#5a6c7d', fontSize: '14px', marginBottom: '16px' }}>
          Pomóż nam się rozwijać - zgłoś problem lub podziel się pomysłem
        </p>

        <a
          href="mailto:kontakt@pomocnikobywatela.pl?subject=Zgłoszenie błędu lub sugestii"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#2c5aa0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            textDecoration: 'none'
          }}
        >
          Wyślij zgłoszenie
        </a>
      </div>
    </div>
  </div>
);

// Utility Components
const FormField = ({ label, icon: Icon, value, onChange, disabled, hint, placeholder, type = 'text', multiline = false }) => (
  <div>
    <label style={{
      display: 'block',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '8px',
      fontSize: '14px'
    }}>
      {label}
    </label>

    <div style={{ position: 'relative' }}>
      {Icon && (
        <Icon size={20} color="#5a6c7d" style={{
          position: 'absolute',
          left: '12px',
          top: multiline ? '12px' : '50%',
          transform: multiline ? 'none' : 'translateY(-50%)'
        }} />
      )}

      {multiline ? (
        <textarea
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 12px 12px 42px',
            border: '2px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '15px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            minHeight: '80px',
            resize: 'vertical',
            opacity: disabled ? 0.6 : 1
          }}
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 12px 12px 42px',
            border: '2px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '15px',
            boxSizing: 'border-box',
            opacity: disabled ? 0.6 : 1
          }}
        />
      )}
    </div>

    {hint && (
      <p style={{ fontSize: '13px', color: '#5a6c7d', marginTop: '6px', margin: '6px 0 0 0' }}>
        {hint}
      </p>
    )}
  </div>
);

const CheckboxField = ({ label, checked, onChange, hint, disabled }) => (
  <div>
    <label style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{
          width: '18px',
          height: '18px',
          marginTop: '2px',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      />
      <div>
        <span style={{
          fontWeight: '500',
          color: '#2c3e50',
          fontSize: '15px'
        }}>
          {label}
        </span>
        {hint && (
          <p style={{ fontSize: '13px', color: '#5a6c7d', margin: '4px 0 0 0' }}>
            {hint}
          </p>
        )}
      </div>
    </label>
  </div>
);

export default SettingsTab;
