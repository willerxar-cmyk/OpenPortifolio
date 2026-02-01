import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PROFILE_FILE = path.join(process.cwd(), 'src', 'data', 'profile.json');

// Default profile structure
const defaultProfile = {
  profile: {
    name: 'Your Name',
    title: 'Creative Developer & Designer',
    bio: 'Passionate about creating beautiful, functional, and user-centered digital experiences.',
    email: 'contact@example.com',
    emailPrivate: false,
    phone: '',
    phonePrivate: false,
    location: '',
    website: '',
    avatar: '/images/avatar.jpg',
    social: [],
  },
  stats: {
    projectsCompleted: 0,
    yearsExperience: 0,
    happyClients: 0,
  },
  curriculum: {
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    awards: [],
    interests: [],
  },
  availableForHire: true,
};

// GET /api/profile
export async function GET() {
  try {
    let profile;
    try {
      const data = await fs.readFile(PROFILE_FILE, 'utf-8');
      profile = JSON.parse(data);
    } catch {
      // File doesn't exist or is invalid, return default
      profile = defaultProfile;
    }
    
    // Ensure curriculum structure exists
    if (!profile.curriculum) {
      profile.curriculum = defaultProfile.curriculum;
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error reading profile:', error);
    return NextResponse.json(
      { error: 'Failed to read profile' },
      { status: 500 }
    );
  }
}

// PUT /api/profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required structure
    const profileData = {
      ...defaultProfile,
      ...body,
      profile: {
        ...defaultProfile.profile,
        ...body.profile,
        social: body.profile?.social || [],
      },
      curriculum: {
        ...defaultProfile.curriculum,
        ...body.curriculum,
      },
    };
    
    // Ensure privacy fields exist
    profileData.profile.emailPrivate = profileData.profile.emailPrivate ?? false;
    profileData.profile.phonePrivate = profileData.profile.phonePrivate ?? false;
    
    // Ensure all curriculum sections exist
    profileData.curriculum.experience = profileData.curriculum.experience || [];
    profileData.curriculum.education = profileData.curriculum.education || [];
    profileData.curriculum.skills = profileData.curriculum.skills || [];
    profileData.curriculum.languages = profileData.curriculum.languages || [];
    profileData.curriculum.certifications = profileData.curriculum.certifications || [];
    profileData.curriculum.interests = profileData.curriculum.interests || [];
    
    // Ensure data directory exists
    const dataDir = path.dirname(PROFILE_FILE);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    await fs.writeFile(PROFILE_FILE, JSON.stringify(profileData, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true,
      message: 'Profile saved successfully',
      profile: profileData,
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}
