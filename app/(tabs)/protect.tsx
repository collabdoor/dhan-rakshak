import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield,
  AlertTriangle,
  Phone,
  MessageSquare,
  Mail,
  CreditCard,
  Eye,
  Users,
  CheckCircle,
  XCircle,
  Play,
  BookOpen,
  TrendingUp
} from 'lucide-react-native';

interface FraudScenario {
  id: string;
  title: string;
  type: 'phishing' | 'otp' | 'identity' | 'investment';
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
  icon: React.ReactNode;
  gradient: string[];
}

interface SecurityTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const fraudScenarios: FraudScenario[] = [
  {
    id: '1',
    title: 'Fake Bank SMS',
    type: 'phishing',
    description: 'Learn to identify fraudulent SMS messages claiming to be from your bank',
    difficulty: 'Easy',
    completed: true,
    icon: <MessageSquare size={24} color="#ffffff" />,
    gradient: ['#ef4444', '#dc2626']
  },
  {
    id: '2',
    title: 'OTP Sharing Scam',
    type: 'otp',
    description: 'Practice recognizing when someone tries to trick you into sharing OTP',
    difficulty: 'Medium',
    completed: false,
    icon: <Phone size={24} color="#ffffff" />,
    gradient: ['#f59e0b', '#d97706']
  },
  {
    id: '3',
    title: 'Fake Investment Scheme',
    type: 'investment',
    description: 'Identify red flags in investment offers that seem too good to be true',
    difficulty: 'Hard',
    completed: false,
    icon: <TrendingUp size={24} color="#ffffff" />,
    gradient: ['#8b5cf6', '#7c3aed']
  },
  {
    id: '4',
    title: 'Phishing Email',
    type: 'phishing',
    description: 'Spot fake emails trying to steal your banking credentials',
    difficulty: 'Medium',
    completed: true,
    icon: <Mail size={24} color="#ffffff" />,
    gradient: ['#3b82f6', '#2563eb']
  }
];

const securityTips: SecurityTip[] = [
  {
    id: '1',
    title: 'Never Share OTP',
    description: 'Banks and legitimate companies will never ask for your OTP over phone or email',
    icon: <Shield size={20} color="#10b981" />,
    category: 'Authentication'
  },
  {
    id: '2',
    title: 'Verify Before Clicking',
    description: 'Always check the sender\'s email address and URL before clicking any links',
    icon: <Eye size={20} color="#3b82f6" />,
    category: 'Email Security'
  },
  {
    id: '3',
    title: 'Use Strong Passwords',
    description: 'Create unique, complex passwords for each of your financial accounts',
    icon: <CreditCard size={20} color="#8b5cf6" />,
    category: 'Account Security'
  },
  {
    id: '4',
    title: 'Beware of Urgency',
    description: 'Scammers create false urgency. Take time to verify before taking action',
    icon: <AlertTriangle size={20} color="#f59e0b" />,
    category: 'General Awareness'
  }
];

export default function ProtectScreen() {
  const [selectedScenario, setSelectedScenario] = useState<FraudScenario | null>(null);
  const [showScenarioModal, setShowScenarioModal] = useState(false);

  const handleScenarioPress = (scenario: FraudScenario) => {
    setSelectedScenario(scenario);
    setShowScenarioModal(true);
  };

  const handleStartScenario = () => {
    setShowScenarioModal(false);
    // Here you would navigate to the actual scenario simulation
    Alert.alert(
      'Scenario Started',
      `Starting ${selectedScenario?.title} simulation...`,
      [{ text: 'OK' }]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'phishing': return '#ef4444';
      case 'otp': return '#f59e0b';
      case 'identity': return '#8b5cf6';
      case 'investment': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stay Protected</Text>
          <Text style={styles.headerSubtitle}>Learn to identify and prevent fraud</Text>
        </View>

        {/* Security Score */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.scoreCard}
          >
            <View style={styles.scoreContent}>
              <Shield size={40} color="#ffffff" />
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreTitle}>Security Score</Text>
                <Text style={styles.scoreValue}>85/100</Text>
                <Text style={styles.scoreDescription}>Good - Keep improving!</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.improveButton}>
              <Text style={styles.improveButtonText}>Improve Score</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Scenarios Completed</Text>
              <CheckCircle size={16} color="#10b981" />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>In Progress</Text>
              <Play size={16} color="#f59e0b" />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Tips Learned</Text>
              <BookOpen size={16} color="#3b82f6" />
            </View>
          </View>
        </View>

        {/* Fraud Scenarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Scenarios</Text>
          <Text style={styles.sectionSubtitle}>
            Interactive simulations to test your fraud detection skills
          </Text>
          
          {fraudScenarios.map((scenario) => (
            <TouchableOpacity
              key={scenario.id}
              style={styles.scenarioCard}
              onPress={() => handleScenarioPress(scenario)}
            >
              <LinearGradient
                colors={scenario.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scenarioGradient}
              >
                {scenario.icon}
              </LinearGradient>
              
              <View style={styles.scenarioContent}>
                <View style={styles.scenarioHeader}>
                  <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                  {scenario.completed && (
                    <CheckCircle size={20} color="#10b981" />
                  )}
                </View>
                
                <Text style={styles.scenarioDescription}>{scenario.description}</Text>
                
                <View style={styles.scenarioFooter}>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(scenario.difficulty) + '20' }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(scenario.difficulty) }
                    ]}>
                      {scenario.difficulty}
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.typeBadge,
                    { backgroundColor: getTypeColor(scenario.type) + '20' }
                  ]}>
                    <Text style={[
                      styles.typeText,
                      { color: getTypeColor(scenario.type) }
                    ]}>
                      {scenario.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Tips</Text>
          <Text style={styles.sectionSubtitle}>
            Essential knowledge to keep your finances safe
          </Text>
          
          {securityTips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIcon}>
                {tip.icon}
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
                <Text style={styles.tipCategory}>{tip.category}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity style={styles.emergencyCard}>
              <Phone size={24} color="#ef4444" />
              <Text style={styles.emergencyTitle}>Report Fraud</Text>
              <Text style={styles.emergencyNumber}>1930</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.emergencyCard}>
              <CreditCard size={24} color="#3b82f6" />
              <Text style={styles.emergencyTitle}>Block Card</Text>
              <Text style={styles.emergencyNumber}>Bank Helpline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Scenario Modal */}
      <Modal
        visible={showScenarioModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowScenarioModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedScenario && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedScenario.title}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowScenarioModal(false)}
                  >
                    <XCircle size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.modalDescription}>
                  {selectedScenario.description}
                </Text>
                
                <View style={styles.modalBadges}>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(selectedScenario.difficulty) + '20' }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(selectedScenario.difficulty) }
                    ]}>
                      {selectedScenario.difficulty}
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.typeBadge,
                    { backgroundColor: getTypeColor(selectedScenario.type) + '20' }
                  ]}>
                    <Text style={[
                      styles.typeText,
                      { color: getTypeColor(selectedScenario.type) }
                    ]}>
                      {selectedScenario.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={styles.startScenarioButton}
                  onPress={handleStartScenario}
                >
                  <Play size={16} color="#ffffff" />
                  <Text style={styles.startScenarioText}>
                    {selectedScenario.completed ? 'Practice Again' : 'Start Scenario'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  scoreCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreInfo: {
    marginLeft: 16,
    flex: 1,
  },
  scoreTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  scoreDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
  improveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  improveButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  scenarioCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scenarioGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    flex: 1,
  },
  scenarioDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  scenarioFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  tipCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tipIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  tipCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4f46e5',
  },
  emergencyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  emergencyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  emergencyNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4f46e5',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalBadges: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  startScenarioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  startScenarioText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
});