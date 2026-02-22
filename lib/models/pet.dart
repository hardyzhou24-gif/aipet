import 'shelter.dart';

class Pet {
  final String id;
  final String name;
  final String breed;
  final String age;
  final String gender;
  final String location;
  final String distance;
  final String? fee;
  final String image;
  final String type; // dog, cat, bird, rabbit, other
  final List<String> tags;
  final String description;
  final Shelter shelter;
  final String? videoUrl;
  final String? vaccination;
  final bool neutered;
  final String? specialNeeds;
  final String? createdAt;

  const Pet({
    required this.id,
    required this.name,
    required this.breed,
    required this.age,
    required this.gender,
    required this.location,
    required this.distance,
    this.fee,
    required this.image,
    required this.type,
    this.tags = const [],
    this.description = '',
    this.shelter = const Shelter(
      id: '',
      name: '',
      address: '',
      distance: '',
      logo: '',
    ),
    this.videoUrl,
    this.vaccination,
    this.neutered = false,
    this.specialNeeds,
    this.createdAt,
  });

  factory Pet.fromJson(Map<String, dynamic> json) {
    final shelterData = json['shelter'];
    return Pet(
      id: json['id']?.toString() ?? '',
      name: json['name'] ?? '',
      breed: json['breed'] ?? '',
      age: json['age'] ?? '',
      gender: json['gender'] ?? '',
      location: json['location'] ?? '',
      distance: json['distance'] ?? '',
      fee: json['fee'],
      image: json['image'] ?? '',
      type: json['type'] ?? 'other',
      tags:
          (json['tags'] as List<dynamic>?)?.map((e) => e.toString()).toList() ??
          [],
      description: json['description'] ?? '',
      shelter: shelterData is Map<String, dynamic>
          ? Shelter.fromJson(shelterData)
          : Shelter.empty,
      videoUrl: json['video_url'],
      vaccination: json['vaccination'],
      neutered: json['neutered'] ?? false,
      specialNeeds: json['special_needs'],
      createdAt: json['created_at'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'breed': breed,
    'age': age,
    'gender': gender,
    'location': location,
    'distance': distance,
    'fee': fee,
    'image': image,
    'type': type,
    'tags': tags,
    'description': description,
    'video_url': videoUrl,
    'vaccination': vaccination,
    'neutered': neutered,
    'special_needs': specialNeeds,
  };
}
