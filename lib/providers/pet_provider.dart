import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/pet.dart';
import '../services/pet_service.dart';

class PetProvider extends ChangeNotifier {
  final PetService _petService;

  List<Pet> _pets = [];
  List<Pet> get pets => _pets;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String _activeCategory = 'all';
  String get activeCategory => _activeCategory;

  List<String> _likedPetIds = [];
  List<String> get likedPetIds => _likedPetIds;

  PetProvider(this._petService) {
    _loadLikedPets();
    fetchPets();
  }

  Future<void> fetchPets() async {
    _isLoading = true;
    notifyListeners();

    _pets = await _petService.getPets(type: _activeCategory);

    _isLoading = false;
    notifyListeners();
  }

  void setActiveCategory(String category) {
    if (_activeCategory == category) return;
    _activeCategory = category;
    fetchPets();
  }

  Future<void> _loadLikedPets() async {
    final prefs = await SharedPreferences.getInstance();
    _likedPetIds = prefs.getStringList('likedPets') ?? [];
    notifyListeners();
  }

  Future<void> toggleLike(String petId) async {
    if (_likedPetIds.contains(petId)) {
      _likedPetIds.remove(petId);
    } else {
      _likedPetIds.add(petId);
    }
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('likedPets', _likedPetIds);
  }

  bool isLiked(String petId) {
    return _likedPetIds.contains(petId);
  }

  // 获取我喜欢的宠物列表
  List<Pet> get likedPets {
    return _pets.where((pet) => _likedPetIds.contains(pet.id)).toList();
  }
}
