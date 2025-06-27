import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home,
  Briefcase,
  ChevronRight,
  Play,
  Clock,
  Users,
  Star
} from 'lucide-react-native';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  progress?: number;
  thumbnail: string;
  isPopular?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  courses: number;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Budgeting',
    icon: <PiggyBank size={24} color="#ffffff" />,
    color: '#10b981',
    courses: 12
  },
  {
    id: '2',
    name: 'Investing',
    icon: <TrendingUp size={24} color="#ffffff" />,
    color: '#3b82f6',
    courses: 18
  },
  {
    id: '3',
    name: 'Credit & Loans',
    icon: <CreditCard size={24} color="#ffffff" />,
    color: '#8b5cf6',
    courses: 8
  },
  {
    id: '4',
    name: 'Insurance',
    icon: <Home size={24} color="#ffffff" />,
    color: '#f59e0b',
    courses: 6
  },
  {
    id: '5',
    name: 'Tax Planning',
    icon: <Briefcase size={24} color="#ffffff" />,
    color: '#ef4444',
    courses: 10
  }
];

const courses: Course[] = [
  {
    id: '1',
    title: 'Personal Budgeting Mastery',
    description: 'Learn to create and maintain a budget that works for your lifestyle',
    category: 'Budgeting',
    difficulty: 'Beginner',
    duration: '2.5 hrs',
    lessons: 8,
    enrolled: 1250,
    rating: 4.8,
    progress: 75,
    thumbnail: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPopular: true
  },
  {
    id: '2',
    title: 'Mutual Funds for Beginners',
    description: 'Start your investment journey with mutual funds in India',
    category: 'Investing',
    difficulty: 'Beginner',
    duration: '3 hrs',
    lessons: 12,
    enrolled: 2100,
    rating: 4.9,
    progress: 40,
    thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'SIP Strategy & Planning',
    description: 'Master Systematic Investment Plans for wealth creation',
    category: 'Investing',
    difficulty: 'Intermediate',
    duration: '4 hrs',
    lessons: 15,
    enrolled: 1800,
    rating: 4.7,
    thumbnail: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Tax Saving Investments',
    description: 'Maximize your tax savings with smart investment choices',
    category: 'Tax Planning',
    difficulty: 'Intermediate',
    duration: '3.5 hrs',
    lessons: 10,
    enrolled: 950,
    rating: 4.6,
    thumbnail: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPopular: true
  }
];

export default function LearnScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCourses = selectedCategory
    ? courses.filter(course => course.category === selectedCategory)
    : courses;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn & Grow</Text>
          <Text style={styles.headerSubtitle}>Build your financial knowledge</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" />
            <Text style={styles.searchPlaceholder}>Search courses...</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  {category.icon}
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.courses} courses</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Course */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Course</Text>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Complete Financial Literacy</Text>
              <Text style={styles.featuredDescription}>
                Master all aspects of personal finance in one comprehensive course
              </Text>
              <View style={styles.featuredStats}>
                <View style={styles.featuredStat}>
                  <BookOpen size={16} color="#ffffff" />
                  <Text style={styles.featuredStatText}>25 lessons</Text>
                </View>
                <View style={styles.featuredStat}>
                  <Clock size={16} color="#ffffff" />
                  <Text style={styles.featuredStatText}>8 hours</Text>
                </View>
                <View style={styles.featuredStat}>
                  <Users size={16} color="#ffffff" />
                  <Text style={styles.featuredStatText}>5K+ enrolled</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.startButton}>
                <Play size={16} color="#667eea" />
                <Text style={styles.startButtonText}>Start Learning</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? `${selectedCategory} Courses` : 'All Courses'}
            </Text>
            {selectedCategory && (
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.clearFilter}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {filteredCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <Image source={{ uri: course.thumbnail }} style={styles.courseThumbnail} />
              <View style={styles.courseContent}>
                <View style={styles.courseHeader}>
                  <View style={styles.courseTitleContainer}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    {course.isPopular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Popular</Text>
                      </View>
                    )}
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </View>
                
                <Text style={styles.courseDescription}>{course.description}</Text>
                
                <View style={styles.courseStats}>
                  <View style={styles.statItem}>
                    <Clock size={14} color="#6b7280" />
                    <Text style={styles.statText}>{course.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <BookOpen size={14} color="#6b7280" />
                    <Text style={styles.statText}>{course.lessons} lessons</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={14} color="#6b7280" />
                    <Text style={styles.statText}>{course.enrolled.toLocaleString()}</Text>
                  </View>
                </View>
                
                <View style={styles.courseFooter}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#f59e0b" fill="#f59e0b" />
                    <Text style={styles.ratingText}>{course.rating}</Text>
                  </View>
                  
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(course.difficulty) + '20' }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(course.difficulty) }
                    ]}>
                      {course.difficulty}
                    </Text>
                  </View>
                </View>
                
                {course.progress && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${course.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{course.progress}% complete</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 12,
  },
  filterButton: {
    padding: 4,
  },
  section: {
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
  },
  clearFilter: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4f46e5',
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
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#4f46e5',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },
  featuredContent: {
    alignItems: 'flex-start',
  },
  featuredTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
    lineHeight: 22,
  },
  featuredStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  featuredStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginLeft: 6,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
    marginLeft: 8,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseThumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f4f6',
  },
  courseContent: {
    padding: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  courseTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginRight: 8,
  },
  popularBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#92400e',
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginLeft: 4,
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4f46e5',
    minWidth: 80,
  },
});