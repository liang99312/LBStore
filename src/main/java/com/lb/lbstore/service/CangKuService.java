/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.CangKu;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface CangKuService {

    public CangKu getCangKuById(Integer id);
    
    public List<CangKu> getAllCangKus();
    
    public boolean updateCangKu(CangKu cangKu);
    
    public CangKu saveCangKu(CangKu cangKu);
    
    public boolean deleteCangKu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<CangKu> queryCangKusByPage(HashMap map);

}
