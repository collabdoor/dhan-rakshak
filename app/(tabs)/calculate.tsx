import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calculator,
  TrendingUp,
  PiggyBank,
  Home,
  CreditCard,
  Target,
  ChevronRight,
  XCircle,
  IndianRupee
} from 'lucide-react-native';

interface CalculatorTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string[];
  category: string;
}

interface SIPCalculation {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
  totalInvestment: number;
  expectedAmount: number;
  wealthGained: number;
}

const calculatorTools: CalculatorTool[] = [
  {
    id: '1',
    title: 'SIP Calculator',
    description: 'Calculate returns on your systematic investment plan',
    icon: <TrendingUp size={24} color="#ffffff" />,
    gradient: ['#667eea', '#764ba2'],
    category: 'Investment'
  },
  {
    id: '2',
    title: 'EMI Calculator',
    description: 'Calculate your loan EMI and total interest payable',
    icon: <CreditCard size={24} color="#ffffff" />,
    gradient: ['#f093fb', '#f5576c'],
    category: 'Loans'
  },
  {
    id: '3',
    title: 'FD Calculator',
    description: 'Calculate fixed deposit maturity amount and interest',
    icon: <PiggyBank size={24} color="#ffffff" />,
    gradient: ['#4facfe', '#00f2fe'],
    category: 'Savings'
  },
  {
    id: '4',
    title: 'Home Loan Calculator',
    description: 'Calculate home loan EMI and affordability',
    icon: <Home size={24} color="#ffffff" />,
    gradient: ['#43e97b', '#38f9d7'],
    category: 'Loans'
  },
  {
    id: '5',
    title: 'Goal Planning',
    description: 'Plan and calculate investments for your financial goals',
    icon: <Target size={24} color="#ffffff" />,
    gradient: ['#fa709a', '#fee140'],
    category: 'Planning'
  },
  {
    id: '6',
    title: 'Tax Calculator',
    description: 'Calculate income tax and plan tax-saving investments',
    icon: <Calculator size={24} color="#ffffff" />,
    gradient: ['#a8edea', '#fed6e3'],
    category: 'Tax'
  }
];

export default function CalculateScreen() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorTool | null>(null);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  
  // SIP Calculator states
  const [monthlyAmount, setMonthlyAmount] = useState('5000');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [sipResult, setSipResult] = useState<SIPCalculation | null>(null);

  const handleCalculatorPress = (calculator: CalculatorTool) => {
    setSelectedCalculator(calculator);
    setShowCalculatorModal(true);
  };

  const calculateSIP = () => {
    const P = parseFloat(monthlyAmount);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;
    
    if (P > 0 && r > 0 && n > 0) {
      const expectedAmount = P * (((1 + r) ** n - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      const wealthGained = expectedAmount - totalInvestment;
      
      setSipResult({
        monthlyInvestment: P,
        expectedReturn: parseFloat(annualReturn),
        timePeriod: parseFloat(timePeriod),
        totalInvestment,
        expectedAmount,
        wealthGained
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderSIPCalculator = () => (
    <View style={styles.calculatorContent}>
      <Text style={styles.calculatorTitle}>SIP Calculator</Text>
      <Text style={styles.calculatorDescription}>
        Calculate the future value of your systematic investment plan
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Monthly Investment Amount</Text>
        <View style={styles.inputWrapper}>
          <IndianRupee size={20} color="#6b7280" />
          <TextInput
            style={styles.textInput}
            value={monthlyAmount}
            onChangeText={setMonthlyAmount}
            keyboardType="numeric"
            placeholder="5000"
          />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Expected Annual Return (%)</Text>
        <TextInput
          style={styles.textInput}
          value={annualReturn}
          onChangeText={setAnnualReturn}
          keyboardType="numeric"
          placeholder="12"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Time Period (Years)</Text>
        <TextInput
          style={styles.textInput}
          value={timePeriod}
          onChangeText={setTimePeriod}
          keyboardType="numeric"
          placeholder="10"
        />
      </View>
      
      <TouchableOpacity style={styles.calculateButton} onPress={calculateSIP}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>
      
      {sipResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Calculation Results</Text>
          
          <View style={styles.resultCard}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Monthly Investment</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(sipResult.monthlyInvestment)}
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total Investment</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(sipResult.totalInvestment)}
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Expected Amount</Text>
              <Text style={[styles.resultValue, styles.highlightValue]}>
                {formatCurrency(sipResult.expectedAmount)}
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Wealth Gained</Text>
              <Text style={[styles.resultValue, styles.successValue]}>
                {formatCurrency(sipResult.wealthGained)}
              </Text>
            </View>
          </View>
          
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Investment Growth Chart</Text>
            <Text style={styles.chartSubtext}>
              Your investment of {formatCurrency(sipResult.totalInvestment)} can grow to{' '}
              {formatCurrency(sipResult.expectedAmount)} in {timePeriod} years
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const getCategoryCount = (category: string) => {
    return calculatorTools.filter(tool => tool.category === category).length;
  };

  const categories = [...new Set(calculatorTools.map(tool => tool.category))];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financial Calculators</Text>
          <Text style={styles.headerSubtitle}>Plan your finances with smart calculations</Text>
        </View>

        {/* Categories Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {getCategoryCount(category)} tools
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Calculator Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Calculators</Text>
          
          {calculatorTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={styles.toolCard}
              onPress={() => handleCalculatorPress(tool)}
            >
              <LinearGradient
                colors={tool.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.toolGradient}
              >
                {tool.icon}
              </LinearGradient>
              
              <View style={styles.toolContent}>
                <View style={styles.toolHeader}>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolCategory}>{tool.category}</Text>
                </View>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </View>
              
              <ChevronRight size={20} color="#6b7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculator Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>💡 Accurate Inputs</Text>
              <Text style={styles.tipText}>
                Use realistic return rates based on historical data for better projections
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>📈 Regular Reviews</Text>
              <Text style={styles.tipText}>
                Review and adjust your calculations quarterly as your income changes
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>🎯 Goal-Based Planning</Text>
              <Text style={styles.tipText}>
                Use different calculators for different goals like education, retirement, etc.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Calculator Modal */}
      <Modal
        visible={showCalculatorModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalculatorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCalculatorModal(false)}
              >
                <XCircle size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedCalculator?.id === '1' && renderSIPCalculator()}
              {selectedCalculator?.id !== '1' && (
                <View style={styles.comingSoonContainer}>
                  <Text style={styles.comingSoonTitle}>
                    {selectedCalculator?.title}
                  </Text>
                  <Text style={styles.comingSoonText}>
                    This calculator is coming soon! For now, try our SIP Calculator.
                  </Text>
                </View>
              )}
            </ScrollView>
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
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  toolCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolContent: {
    flex: 1,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  toolTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  toolCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4f46e5',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  toolDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },
  tipsContainer: {
    paddingHorizontal: 20,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5',
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 4,
  },
  calculatorContent: {
    padding: 20,
  },
  calculatorTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  calculatorDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    marginLeft: 8,
  },
  calculateButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  calculateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  resultContainer: {
    marginTop: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  resultLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  resultValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  highlightValue: {
    color: '#4f46e5',
    fontSize: 18,
  },
  successValue: {
    color: '#10b981',
  },
  chartPlaceholder: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  chartText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  chartSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  comingSoonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});