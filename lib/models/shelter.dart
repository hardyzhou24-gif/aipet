class Shelter {
  final String id;
  final String name;
  final String address;
  final String distance;
  final String logo;

  const Shelter({
    required this.id,
    required this.name,
    required this.address,
    required this.distance,
    required this.logo,
  });

  factory Shelter.fromJson(Map<String, dynamic> json) {
    return Shelter(
      id: json['id']?.toString() ?? '',
      name: json['name'] ?? '',
      address: json['address'] ?? '',
      distance: json['distance'] ?? '',
      logo: json['logo'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'address': address,
    'distance': distance,
    'logo': logo,
  };

  static const empty = Shelter(
    id: '',
    name: '',
    address: '',
    distance: '',
    logo: '',
  );
}
